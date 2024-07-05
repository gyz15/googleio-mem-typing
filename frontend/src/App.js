import React from "react";
import "./App.css";
import Game from "./components/game/Game";
import Ranking from "./components/ranking/Ranking";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;
