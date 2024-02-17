export default function GameOver({ player, rematch }) {
    return <div id="game-over">
        <h2>Game Over!</h2>
        {player ? <p>{player} won!</p> : <p>It's a draw!</p>}
        <p>
            <button onClick={rematch}>Rematch!</button>
        </p>
    </div>
}