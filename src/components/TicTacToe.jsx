import React, { useState, useEffect, useCallback } from 'react';
import './TicTacToe.css';

const NUM_BOARD_CELLS = 9;
const CELL_NOT_FILLED = '';

// VEREDICT
const NO_VEREDICT = ''; // '': no veredict yet
const DRAW_VEREDICT = '-'; // - : draw
const XWINS_VEREDICT = 'X'; // X : X wins
const OWINS_VEREDICT = 'O'; // O : O wins

const TicTacToe = () => {
  const arrayOfEmptySpaces = Array(NUM_BOARD_CELLS).fill(CELL_NOT_FILLED);
  const [board, setBoard] = useState(arrayOfEmptySpaces); // 'X', 'O', ''
  const [whoseTurnIsIt, setWhoseTurnIsIt] = useState('X');
  const [veredict, setVeredict] = useState(NO_VEREDICT);

  const winningColumns = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  const winningRows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  const winningDiagonals = [
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winningCombinations = [
    ...winningColumns,
    ...winningRows,
    ...winningDiagonals,
  ];

  const changePlayer = () =>
    whoseTurnIsIt === 'X' ? setWhoseTurnIsIt('O') : setWhoseTurnIsIt('X');

  const checkWin = (player) => {
    const hasWinner = winningCombinations.some((arrayOfWinningPositions) => {
      const winningCheckArray = arrayOfWinningPositions.map(
        (item) => board[item] === player
      );
      if (winningCheckArray.every((item) => item === true)) {
        setVeredict(player);
        return true;
      }
      return false;
    });

    const boardStillHasMovesLeft = board.some(
      (item) => item === CELL_NOT_FILLED
    );
    if (!hasWinner && !boardStillHasMovesLeft) {
      setVeredict(DRAW_VEREDICT);
    }
  };

  useEffect(() => {
    const boardIsNotEmpty = board.some((item) => item !== CELL_NOT_FILLED);
    const gameHasNoVeredict = veredict === '';
    if (boardIsNotEmpty && gameHasNoVeredict) {
      checkWin(whoseTurnIsIt);
      changePlayer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  const drawIcon = (index) => {
    const isCellNotFilled = board[index] === CELL_NOT_FILLED;
    const hasNoVeredict = veredict === NO_VEREDICT;

    if (isCellNotFilled && hasNoVeredict) {
      const newBoard = [...board];
      newBoard[index] = whoseTurnIsIt;
      setBoard(newBoard);
    }
  };

  const calculateResults = useCallback(() => {
    let resultMessage = '';
    switch (veredict) {
      case DRAW_VEREDICT:
        resultMessage = 'It is a draw! Nobody won the game.';
        break;
      case XWINS_VEREDICT:
        resultMessage = 'X won the game.';
        break;
      case OWINS_VEREDICT:
        resultMessage = 'O won the game.';
        break;
      case NO_VEREDICT:
      default:
        resultMessage = '';
        break;
    }
    return resultMessage;
  }, [veredict]);

  return (
    <div>
      <div className="board">
        {arrayOfEmptySpaces.map((_, index) => (
          <div
            key={index}
            className="boardCell"
            onClick={() => drawIcon(index)}
          >
            {board[index]}
          </div>
        ))}
      </div>
      <div className="results">{calculateResults()}</div>
    </div>
  );
};

export default TicTacToe;
