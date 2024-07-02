import React, { useState, useEffect } from "react";
import "./App.css";
import { defaultGameState } from "./config/gameConfig";

function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [readyTime, setReadyTime] = useState(defaultGameState.readyTime);
  const [gameState, setGameState] = useState(defaultGameState);

  // INFO Pregame Countdown Function
  useEffect(() => {
    if (gameState.gameStarted && gameState.preGame && readyTime > 0) {
      const timer = setTimeout(
        () => setReadyTime((prevTime) => prevTime - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (readyTime === 0) {
      setShowPhrase(true);
      setGameState((prevState) => ({ ...prevState, preGame: false }));
    }
  }, [gameState.gameStarted, gameState.preGame, readyTime]);

  // INFO Main game function: Memory Phase
  useEffect(() => {
    // console.log(gameState.preGame, gameState.level, phrases.length);
    if (
      !gameState.preGame &&
      gameState.gameStarted &&
      gameState.level < phrases.length
    ) {
      console.log("Memory phase started");
      setCurrentPhrase(phrases[gameState.level]);
      setShowPhrase(true);

      const timer = setTimeout(() => {
        console.log("Memory phase ended");
        setShowPhrase(false);
        // TODO Dynamic Timing for each level
        // }, levels[currentLevel].time);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState.level >= phrases.length) {
      setGameState((prevState) => ({ ...prevState, gameOver: true }));
    }
  }, [gameState.preGame, gameState.level, gameState.gameStarted, phrases]);

  // INFO Post-round checking function
  const postRoundChecking = (e) => {
    e.preventDefault();
    if (inputPhrase.toLowerCase() === currentPhrase.toLowerCase()) {
      setInputPhrase("");
      // TODO Function to determine marks dynamically
      setGameState({
        ...gameState,
        level: gameState.level + 1,
        marksCollected: gameState.marksCollected + 1,
      });
    } else {
      setGameState({ ...gameState, gameOver: true });
    }
  };

  const resetGame = (isNewGame) => {
    // Reset game state to default game state
    setGameState({
      ...defaultGameState,
      gameStarted: isNewGame,
      preGame: true,
    });
    // Determine the 5 level phrases to be typed by user
    // WARNING: Demo phrases only, DO NOT USE IN PRODUCTION
    setPhrases([
      "This",
      "This is",
      "This is a",
      "This is a demo",
      "This is a demo nia",
    ]);
    setInputPhrase("");
  };

  const startGame = () => {
    resetGame(true);
  };

  const tryAgain = () => {
    resetGame(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto text-center">
        {!gameState.gameStarted && (
          <>
            <h1 className="text-7xl font-semibold mb-4 text-white">
              Visual Memory Test 💬
            </h1>
            <p className="text-3xl font-semibold mb-4 text-white">
              Memorize the sentences.
            </p>
          </>
        )}
        <div className="py-5">
          {!gameState.gameStarted ? (
            <>
              <button
                className="bg-blue-400 px-10 py-2 rounded-full text-white hover:bg-sky-700 transform hover:scale-105 transition-transform duration-300"
                onClick={startGame}
              >
                Start Game
              </button>
            </>
          ) : !gameState.gameOver ? (
            <>
              {gameState.preGame ? (
                <h2 className="text-5xl text-white">
                  Get ready in <span className="text-black">{readyTime}</span>{" "}
                  seconds...
                </h2>
              ) : (
                <>
                  <h3 className="text-5xl text-white font-semibold">
                    Question {gameState.level + 1}:
                  </h3>
                  {showPhrase && (
                    <h2 className="text-6xl font-bold pt-5 text-sky-600">
                      {currentPhrase}
                    </h2>
                  )}
                  {!showPhrase && (
                    <form onSubmit={postRoundChecking} className="mt-4">
                      <input
                        type="text"
                        value={inputPhrase}
                        onChange={(e) => setInputPhrase(e.target.value)}
                        autoFocus
                        className="border-2 border-gray-300 p-2 text-lg w-72 "
                      />
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 ml-2 rounded transform hover:scale-110 transition-transform duration-300 hover:bg-green-600"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="text-5xl font-semibold text-white">
                Congratulations!
              </h2>
              <h3 className="text-2xl font-semibold py-5 text-white">
                You have scored:{" "}
              </h3>
              {gameState.marksCollected === 0 ? (
                <h1 className="pb-5 text-2xl text-white">
                  <span className="font-bold text-3xl">
                    {gameState.marksCollected}{" "}
                  </span>
                  marks 🙁
                </h1>
              ) : (
                <h1 className="text-2xl">{gameState.marksCollected} marks</h1>
              )}
              <button
                className="rounded-full bg-yellow-500 text-white px-20 py-2  hover:bg-yellow-600 transform hover:scale-105 transition-transform duration-300"
                onClick={tryAgain}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
