import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home">
      <div className="home-game-preview"></div>
      <div className="home-btn-container">
        <Link className="home-nav" to="/game">
          Play
        </Link>
      </div>
    </main>
  );
}
