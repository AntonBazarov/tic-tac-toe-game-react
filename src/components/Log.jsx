export default function Log({ turns }) {
  return (
    <ul id='log'>
      {turns.map((turn) => (
        <li key={`${turn.square.row}_${turn.square.col}`}>
          {turn.player} select {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ul>
  )
}
