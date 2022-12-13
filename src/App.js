import "./App.css";
import { useState, useEffect } from "react";
import Square from "./components/Square";
import { Patterns } from "./components/Patterns";
import clickSound from "./Assets/ClickSound.mp3";

function App() {
  const initialBoard = ["", "", "", "", "", "", "", "", ""];
  const initialResult = { winner: "none", state: "none" };
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState(initialResult);
  const [currentPattern, setCurrentPattern] = useState(null);
  const [currentSquare, setCurrentSquare] = useState(null);

  // const audioClip = { sound: clickSound, label: "click" };
  const audio = new Audio(clickSound);
  audio.loop = true;

  const chooseSquare = (square) => {
    audio.loop = false;
    audio.volume = 0.2; 
    audio.play();

    setCurrentSquare(square);
    setBoard(
      board.map((val, idx) => {
        if (idx == square && val == "") {
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;

      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setCurrentPattern(currPattern);
        setResult({
          winner: player,
          state: "won",
        });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;

    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No One", state: "tie" });
    }
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setResult(initialResult);
    setPlayer("O");
  };

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (player == "X") setPlayer("O");
    else setPlayer("X");
  }, [board]);

  useEffect(() => {
    // if (result.state != "none") {
    //   setTimeout(() => {
    //     restartGame();
    //   }, 5000);
    // }
  }, [result]);

  return (
    <div className="App">
      <div className="container">
        {result.winner != "none" && (
          <div className="winning_text">
            <div>Game Finished!</div>
            <div>Winning Player: {result.winner}</div>
            <button className="restart_btn" onClick={restartGame}>
              Restart
            </button>
          </div>
        )}
        <div className="player_section">Player : {player}</div>
        <div className={`board ${result.winner != "none" ? "no_move" : null}`}>
          <div className="row">
            <Square
              value={board[0]}
              pos={0}
              chooseSquare={() => {
                chooseSquare(0);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[1]}
              pos={1}
              chooseSquare={() => {
                chooseSquare(1);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[2]}
              pos={2}
              chooseSquare={() => {
                chooseSquare(2);
              }}
              setCurrentSquare={setCurrentSquare}
            />
          </div>
          <div className="row">
            <Square
              value={board[3]}
              pos={3}
              chooseSquare={() => {
                chooseSquare(3);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[4]}
              pos={4}
              chooseSquare={() => {
                chooseSquare(4);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[5]}
              pos={5}
              chooseSquare={() => {
                chooseSquare(5);
              }}
              setCurrentSquare={setCurrentSquare}
            />
          </div>
          <div className="row">
            <Square
              value={board[6]}
              pos={6}
              chooseSquare={() => {
                chooseSquare(6);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[7]}
              pos={7}
              chooseSquare={() => {
                chooseSquare(7);
              }}
              setCurrentSquare={setCurrentSquare}
            />
            <Square
              value={board[8]}
              pos={8}
              chooseSquare={() => {
                chooseSquare(8);
              }}
              setCurrentSquare={setCurrentSquare}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
