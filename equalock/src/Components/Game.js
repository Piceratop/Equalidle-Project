import PieceControl from "./PieceControl";
import GameGrid from "./GameGrid";

export default function Game() {
  return (
    <main className="game">
      <GameGrid />
      <PieceControl />
    </main>
  );
}
