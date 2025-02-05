import React, { useState } from "react";
import { useParams } from "react-router-dom";

const GameChess = () => {
  const { id } = useParams(); // Get the game id from URL
  const [board, setBoard] = useState(generateInitialBoard()); // Initialize the chessboard state
  const [selectedPiece, setSelectedPiece] = useState(null);

  // Generate initial chessboard with pieces
  function generateInitialBoard() {
    return [
      ["r", "n", "b", "q", "k", "b", "n", "r"], // 1st row - Black pieces
      ["p", "p", "p", "p", "p", "p", "p", "p"], // 2nd row - Black pawns
      ["", "", "", "", "", "", "", ""], // 3rd row
      ["", "", "", "", "", "", "", ""], // 4th row
      ["", "", "", "", "", "", "", ""], // 5th row
      ["", "", "", "", "", "", "", ""], // 6th row
      ["P", "P", "P", "P", "P", "P", "P", "P"], // 7th row - White pawns
      ["R", "N", "B", "Q", "K", "B", "N", "R"], // 8th row - White pieces
    ];
  }

  // Handle selecting a piece on the board
  const handleSelectPiece = (row, col) => {
    if (selectedPiece) {
      // If a piece is already selected, move it
      movePiece(row, col);
    } else {
      // Otherwise, just select the piece
      setSelectedPiece({ row, col });
    }
  };

  // Move the selected piece to the new position
  const movePiece = (newRow, newCol) => {
    const newBoard = [...board];
    const piece = newBoard[selectedPiece.row][selectedPiece.col];
    newBoard[selectedPiece.row][selectedPiece.col] = "";
    newBoard[newRow][newCol] = piece;
    setBoard(newBoard);
    setSelectedPiece(null); // Deselect piece after moving
  };

  // Render chessboard with pieces
  const renderSquare = (row, col) => {
    const piece = board[row][col];
    const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;

    return (
      <div
        key={`${row}-${col}`}
        onClick={() => handleSelectPiece(row, col)}
        className={`square ${isSelected ? "border-4 border-red-500" : ""} ${
          (row + col) % 2 === 0 ? "bg-[#f0d9b5]" : "bg-[#b58863]"
        } flex items-center justify-center cursor-pointer`}
      >
        {piece && <span className="text-xl">{piece}</span>}
      </div>
    );
  };

  return (
    <div className="game-chess-container">
      <h1 className="text-3xl font-bold text-center mt-10">Chess Game #{id}</h1>
      <div className="chessboard-container flex justify-center mt-10">
        <div
          className="chessboard grid grid-cols-8 grid-rows-8 gap-0"
          style={{ gridTemplateColumns: "repeat(8, 60px)", gridTemplateRows: "repeat(8, 60px)" }}
        >
          {board.map((row, rowIndex) =>
            row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameChess;
