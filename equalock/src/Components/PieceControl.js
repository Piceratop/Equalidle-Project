import { useContext } from "react";
import { GameContext } from "../contexts/gameContext";

export default function PieceControl() {
  const { state, dispatch } = useContext(GameContext);
  const { grid, currentPiece } = state;
  const [height, width] = [grid.length, grid[0].length];
  const animationTimeUnit = 0.1;
  const moveCurrentPiece = (dx, dy, arrow) => {
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
      arrow.style.backgroundColor = "white";
      arrow.style.transition = "";

      setTimeout(() => {
        arrow.style.backgroundColor = "";
        arrow.style.transition = `background-color ${animationTimeUnit}s ease-out`;
        dispatch({ type: "UPDATE_GRID", payload: newGrid });
      }, animationTimeUnit * 1000);
    }
  };

  return (
    <div className="piece-control">
      <div
        className="arrow-control"
        style={{ gridColumn: 2, gridRow: 1 }}
        onClick={(e) => moveCurrentPiece(0, -1, e.target)}
      >
        ▲
      </div>
      <div
        className="arrow-control"
        style={{ gridColumn: 1, gridRow: 2 }}
        onClick={(e) => moveCurrentPiece(-1, 0, e.target)}
      >
        ◀
      </div>
      <div
        className="arrow-control"
        style={{ gridColumn: 2, gridRow: 2 }}
        onClick={(e) => moveCurrentPiece(0, 1, e.target)}
      >
        ▼
      </div>
      <div
        className="arrow-control"
        style={{ gridColumn: 3, gridRow: 2 }}
        onClick={(e) => moveCurrentPiece(1, 0, e.target)}
      >
        ▶
      </div>
    </div>
  );
}
