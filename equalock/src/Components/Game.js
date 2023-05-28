import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function Game() {
  const [grid, setGrid] = useState([
    [0, 1, 0],
    [0, 2, 3],
    [0, 2, 0],
  ]);
  const [height, width] = [grid.length, grid[0].length];
  const unit = `min(20vh, 20vw)`;
  const [currentPiece, setCurrentPiece] = useState(null);

  const gameGridStyle = {
    gridTemplateColumns: `repeat(${width}, ${unit})`,
    gridTemplateRows: `repeat(${height}, ${unit})`,
  };

  const gridElements = [];
  const moveCurrentPiece = (dx, dy) => {
    const newGrid = [...grid];
    const oldCell = [];
    const changedCell = [];
    let canChange = true;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const value = newGrid[y][x];
        if (value !== currentPiece) continue;

        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
          canChange = false;
          break;
        }

        const targetValue = newGrid[newY][newX];
        if (targetValue !== 0 && targetValue !== currentPiece) {
          canChange = false;
          break;
        }

        oldCell.push([y, x]);
        changedCell.push([newY, newX]);
      }
      if (!canChange) break;
    }

    if (canChange) {
      for (let [y, x] of oldCell) {
        newGrid[y][x] = 0;
      }
      for (let [y, x] of changedCell) {
        newGrid[y][x] = currentPiece;
      }

      const pieces = document.querySelectorAll(".game-cell");
      pieces.forEach((piece) => {
        if (parseInt(piece.getAttribute("piecevalue")) === currentPiece) {
          piece.style.transition = "transform 0.2s ease-out";
          piece.style.transform = `translate(${dx * 100}%, ${dy * 100}%)`;
        }
      });

      setTimeout(() => {
        setGrid(newGrid);
      }, 200);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      moveCurrentPiece(1, 0);
    } else if (event.key === "ArrowLeft") {
      moveCurrentPiece(-1, 0);
    } else if (event.key === "ArrowDown") {
      moveCurrentPiece(0, 1);
    } else if (event.key === "ArrowUp") {
      moveCurrentPiece(0, -1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = grid[y][x];
      const topBorder =
        y === 0 || grid[y - 1][x] !== value
          ? value === 1
            ? "3px solid red"
            : "3px solid white"
          : "";
      const bottomBorder =
        y === height - 1 || grid[y + 1][x] !== value
          ? value === 1
            ? "3px solid red"
            : "3px solid white"
          : "";
      const leftBorder =
        x === 0 || grid[y][x - 1] !== value
          ? value === 1
            ? "3px solid red"
            : "3px solid white"
          : "";
      const rightBorder =
        x === width - 1 || grid[y][x + 1] !== value
          ? value === 1
            ? "3px solid red"
            : "3px solid white"
          : "";
      const backgroundColor =
        value === currentPiece ? (value === 1 ? "red" : "white") : "";

      if (!value) {
        continue;
      }

      gridElements.push(
        <div
          key={uuid()}
          piecevalue={value}
          className="game-cell"
          style={{
            gridColumn: `${x + 1}`,
            gridRow: `${y + 1}`,
            backgroundColor: backgroundColor,
            borderTop: topBorder,
            borderBottom: bottomBorder,
            borderLeft: leftBorder,
            borderRight: rightBorder,
          }}
          onClick={() => setCurrentPiece(value)}
        ></div>
      );
    }
  }

  return (
    <main>
      <div className="game-grid" style={gameGridStyle}>
        {gridElements}
      </div>
    </main>
  );
}
