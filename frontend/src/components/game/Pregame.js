import React from "react";

// TODO save participant name, validate partcipant before start game, check validity
const Pregame = ({ startGame, participantName, setParticipantName }) => {
  return (
    <>
      <h1 className="text-7xl font-semibold mb-4 text-white">
        Visual Memory Test 💬
      </h1>
      <p className="text-3xl font-semibold mb-4 text-white">
        Memorize the sentences.
      </p>
      <form>
        <input
          type="text"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          autoFocus
          placeholder="Enter your name"
          className="border-2 border-gray-300 p-2 text-lg w-72"
        />
        <button
          className="bg-blue-400 px-10 py-2 rounded-full text-white hover:bg-sky-700 transform hover:scale-105 transition-transform duration-300"
          onClick={startGame}
        >
          Start Game
        </button>
      </form>
    </>
  );
};

export default Pregame;
