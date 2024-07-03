import React from "react";

// TODO save participant name, validate partcipant before start game, check validity
const Pregame = ({ startGame }) => {
  return (
    <>
      <h1 className="text-7xl font-semibold mb-4 text-white">
        Visual Memory Test 💬
      </h1>
      <p className="text-3xl font-semibold mb-4 text-white">
        Memorize the sentences.
      </p>
      <button
        className="bg-blue-400 px-10 py-2 rounded-full text-white hover:bg-sky-700 transform hover:scale-105 transition-transform duration-300"
        onClick={startGame}
      >
        Start Game
      </button>
    </>
  );
};

export default Pregame;
