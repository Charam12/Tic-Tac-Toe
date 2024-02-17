import { useState } from "react"

import Player from "./Components/Player"
import GameBoard from "./Components/GameBoard"
import Logs from "./Components/Logs";

import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./Components/GameOver";


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  
  if( gameTurns.length > 0 && gameTurns[0].player === 'X' ) {
    currentPlayer = "O"
  }
  
  return currentPlayer
  
}

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  const [ hasWinner, setHasWinner ] = useState(false);
  // const [ activePlayer, setActivePlayer ] = useState("X");

  let winner = null;

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...intialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelect(rowIndex, colIndex) {
    // setActivePlayer((currentPlayer) => currentPlayer === "X" ? "O" : "X");
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(gameTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns
      ];

      return updateTurns;
    })
  }

  function handleRematch() {
    setGameTurns([])
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            intialName="Player 1" 
            symbol="X" 
            isActive={activePlayer === "X"}
          />
          <Player 
            intialName="Player 2" 
            symbol="O" 
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw)&& <GameOver player={winner} rematch={handleRematch}/>}
        <GameBoard 
          onSelect={handleSelect} 
          board={gameBoard}
        />
      </div>
      <Logs turns={gameTurns}/>
    </main>
  )
}

export default App
