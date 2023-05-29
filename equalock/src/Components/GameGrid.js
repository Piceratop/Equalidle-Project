import { useEffect, useContext } from "react";
import { GameContext } from "../contexts/gameContext";
import { v4 as uuid } from "uuid";

export default function GameGrid() {
  const { state, dispatch } = useContext(GameContext);
  const { grid, currentPiece, gridRendered } = state;
  const [height, width] = [grid.length, grid[0].length];
  const unit = `min(20vh, 20vw)`;
  const gameGridStyle = {
    gridTemplateColumns: `repeat(${width}, ${unit})`,
    gridTemplateRows: `repeat(${height}, ${unit})`,
  };
  const animationTimeUnit = 0.1;

  const gridElements = [];

  const changePiece = (value) => {
    const pieces = document.querySelectorAll(".game-cell");
    pieces.forEach((piece) => {
      const pieceValue = parseInt(piece.getAttribute("piecevalue"));
      piece.style.transition = `background-color ${animationTimeUnit}s ease-out`;
      if (pieceValue === value) {
        piece.style.backgroundColor = pieceValue === 1 ? "red" : "white";
      } else {
        piece.style.backgroundColor = "";
      }
    });
    setTimeout(() => {
      dispatch({ type: "UPDATE_CURRENT_PIECE", payload: value });
    }, animationTimeUnit * 1000);
  };

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
          piece.style.transition = `transform ${animationTimeUnit}s ease-out`;
          piece.style.transform = `translate(${dx * 100}%, ${dy * 100}%)`;
        }
      });

      setTimeout(() => {
        dispatch({ type: "UPDATE_GRID", payload: newGrid });
      }, animationTimeUnit * 1000);
    }
  };

  const handleKeyDown = (event) => {
    if (gridRendered) {
      if (event.key === "ArrowRight") {
        moveCurrentPiece(1, 0);
      } else if (event.key === "ArrowLeft") {
        moveCurrentPiece(-1, 0);
      } else if (event.key === "ArrowDown") {
        moveCurrentPiece(0, 1);
      } else if (event.key === "ArrowUp") {
        moveCurrentPiece(0, -1);
      }
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
          className={`game-cell ${gridRendered ? "" : "game-cell-animation"}`}
          style={{
            gridColumn: `${x + 1}`,
            gridRow: `${y + 1}`,
            backgroundColor: backgroundColor,
            borderTop: topBorder,
            borderBottom: bottomBorder,
            borderLeft: leftBorder,
            borderRight: rightBorder,
          }}
          onClick={() => changePiece(value)}
        ></div>
      );
    }
  }
  if (!gridRendered) {
    setTimeout(() => {
      dispatch({ type: "UPDATE_GRID_STATE" });
    }, 1000);
  }

  return (
    <div className="game-grid" style={gameGridStyle}>
      {gridElements}
    </div>
  );
}
