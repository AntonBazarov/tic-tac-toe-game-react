import { useState } from 'react'

export default function PlayerInfo({
  initialName,
  symbol,
  isActive,
  onChangeName
}) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditButton = () => {
    setIsEditing((editing) => !editing)

    if (isEditing) {
      onChangeName(symbol, playerName)
    }
  }

  const changePlayerName = (e) => {
    setPlayerName(e.target.value)
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      {isEditing ? (
        <input
          required
          type='text'
          value={playerName}
          onChange={changePlayerName}
        />
      ) : (
        <span className='player-name'>{playerName}</span>
      )}
      <span className='player-symbol'>{symbol}</span>
      <button onClick={handleEditButton}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}
