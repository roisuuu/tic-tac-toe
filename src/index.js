import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
    return (
      <button className = "square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }

  function Board() {
    // using hooks to store squares, xIsNext and counter
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, changeTurn] = useState(true);
    const [counter, setCounter] = useState(0);

    function handleClick(i) {
      const squaresNew = squares.slice();
      if (calculateWinner(squaresNew) || squaresNew[i]) {
        // if a winner has been declared OR the square has been taken already
        return;
      }

      squaresNew[i] = xIsNext ? 'X': 'O';
    //   this.setState({
    //     squares: squares, // what? TODO: ask kenneth wtf this is
    //     xIsNext: !this.state.xIsNext,
    //     counter: this.state.counter + 1,
    //   }); 

      // using hooks isntead of this.setState
      setSquares(squaresNew);
      changeTurn(!xIsNext);
      setCounter(prevCount => prevCount + 1);

    }

    function renderSquare(i) {
      return (
            <Square 
              value={squares[i]}
              onClick={() => handleClick(i)}
            />
      );
    }
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
    status = 'Winner: ' + winner;
    } else if (counter === 9) {
    status = 'No winner: Tie Game'
    } else {
    // no winner yet
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
    <div>
        <div className="status">{status}</div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
    </div>
    );
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  // function checks if there is a winner on the board
  function calculateWinner(squares) {
    // the lines that mean a win
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // having squares[a] as the first condition ensures the row isn't null
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }
  