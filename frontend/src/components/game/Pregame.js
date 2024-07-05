import React, { useState } from "react";

// TODO save participant name, validate partcipant before start game, check validity
const Pregame = ({ startGame, participantName, setParticipantName }) => {
  const [errMessage, setErrMessage] = useState("");

  const checkAndStartGame = (e) => {
    e.preventDefault();
    if (participantName === "") {
      setErrMessage("Please enter your name");
    } else {
      startGame();
    }
  };

  const inputUpdateCb = (e) => {
    setErrMessage("");
    setParticipantName(e.target.value);
  };

  return (
    <>
      <h1 className="text-7xl font-semibold mb-4 text-white">
        Visual Memory Test 💬
      </h1>
      <p className="text-3xl font-semibold mb-4 text-white">
        Memorize the sentences.
      </p>
      <form>
        <div className="pb-3">
          <input
            type="text"
            value={participantName}
            onChange={(e) => inputUpdateCb(e)}
            autoFocus
            placeholder="Enter your name"
            className="border-2 border-gray-300 p-2 text-lg w-72"
          />
          {errMessage !== "" && <p className="text-red-500">{errMessage}</p>}
        </div>
        <button
          className="bg-blue-400 px-10 py-2 rounded-full text-white hover:bg-sky-700 transform hover:scale-105 transition-transform duration-300"
          onClick={checkAndStartGame}
        >
          Start Game
        </button>
      </form>
    </>
  );
};

export default Pregame;
