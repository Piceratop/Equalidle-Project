import React from "react";

export default function Game() {
  const grid = [
    [0, 1, 0],
    [0, 2, 0],
    [0, 2, 0],
  ];
  const [height, width] = [grid.length, grid[0].length];

  const unit = `min(20vh, 20vw)`;

  const gameGridStyle = {
    gridTemplateColumns: `repeat(${width}, ${unit})`,
    gridTemplateRows: `repeat(${height}, ${unit})`,
  };

  const gridElements = [];

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

      if (!value) {
        continue;
      }

      gridElements.push(
        <div
          key={`${x}-${y}`}
          className="game-cell"
          style={{
            gridColumn: `${x + 1}`,
            gridRow: `${y + 1}`,
            borderTop: topBorder,
            borderBottom: bottomBorder,
            borderLeft: leftBorder,
            borderRight: rightBorder,
          }}
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
