import { useState } from 'react'
import PlayerInfo from './components/PlayerInfo.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOverModal from './components/GameOverModal.jsx'
import { WINNING_COMBINATIONS } from './static/winning-combinations.js'

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

const PLAYERS = { X: 'Player 1', O: 'Player 2' }

const selectPlayer = (gameTurns) => {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])]

  for (let turn of gameTurns) {
    const { square, player } = turn
    const { col, row } = square

    gameBoard[row][col] = player
  }

  return gameBoard
}

const deriveWinner = (gameBoard, players) => {
  let winner

  for (let combo of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column]
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column]
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]
    }
  }

  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = selectPlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = selectPlayer(gameTurns)

      const updatedGameTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        },
        ...prevGameTurns
      ]

      return updatedGameTurns
    })
  }

  const restartGame = () => {
    setGameTurns([])
  }

  const handlePlayersNames = (symbol, name) => {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: name }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol
          id='players'
          className='highlight-player'
        >
          <PlayerInfo
            initialName={PLAYERS.X}
            symbol='X'
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayersNames}
          />
          <PlayerInfo
            initialName={PLAYERS.O}
            symbol='O'
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayersNames}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOverModal
            winner={winner}
            onRestart={restartGame}
          />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
