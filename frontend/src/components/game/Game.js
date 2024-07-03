import React, { useState, useEffect } from "react";
import { defaultGameState, levels, phrasesList } from "../../config/gameConfig";
import { selectPhrase } from "../../utils/phraseSelector";
import { calculateMark } from "../../utils/calculateMark";
import Question from "./Question";
import Countdown from "./Countdown";
import Result from "./Result";
import Pregame from "./Pregame";
import axios from "../../axios-config";

function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [readyTime, setReadyTime] = useState(defaultGameState.readyTime);
  const [gameState, setGameState] = useState(defaultGameState);
  const [startedElapsedTime, setStartedElapsedTime] = useState(0);
  const [participantName, setParticipantName] = useState("");

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
    if (
      !gameState.preGame &&
      gameState.gameStarted &&
      gameState.level < phrases.length
    ) {
      setCurrentPhrase(phrases[gameState.level]);
      setShowPhrase(true);

      const timer = setTimeout(() => {
        // INFO: Callback function when memory phase ended
        setShowPhrase(false);
      }, getCurrentLevel().time);

      return () => clearTimeout(timer);
    } else if (gameState.level >= phrases.length) {
      setGameState((prevState) => ({ ...prevState, gameOver: true }));
    }
  }, [gameState.preGame, gameState.level, gameState.gameStarted, phrases]);

  // INFO Post-round checking function
  const postRoundChecking = (e) => {
    e.preventDefault();
    // WARNING:   Difficulty not implemented yet
    const elapsedTime = (new Date() - startedElapsedTime) / 1000;

    let marks = calculateMark(
      inputPhrase,
      currentPhrase,
      getCurrentLevel().difficulty,
      elapsedTime
    );

    axios.post("/api/record/addRecord", {
      name: "Name",
      marks: marks,
    });

    setStartedElapsedTime(0);
    setInputPhrase("");
    setGameState({
      ...gameState,
      level: gameState.level + 1,
      marksCollected: gameState.marksCollected + marks,
    });
  };

  const resetGame = (isNewGame) => {
    // Reset game state to default game state
    setReadyTime(defaultGameState.readyTime);
    setGameState({
      ...defaultGameState,
      gameStarted: isNewGame,
      preGame: true,
    });
    // Determine the 5 level phrases to be typed by user
    let currRoundPhrase = selectPhrase(phrasesList);
    setPhrases(currRoundPhrase);
    setInputPhrase("");
  };

  const startGame = () => {
    resetGame(true);
  };

  const tryAgain = () => {
    resetGame(false);
  };

  const wpmHandler = (textBoxValue) => {
    if (inputPhrase === "" && startedElapsedTime === 0) {
      setStartedElapsedTime(new Date());
    }
    setInputPhrase(textBoxValue);
  };

  const getCurrentLevel = () => {
    return levels.find((level) => level.level - 1 === gameState.level);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto text-center">
        {!gameState.gameStarted ? (
          <Pregame startGame={startGame} />
        ) : !gameState.gameOver ? (
          <>
            {gameState.preGame ? (
              <Countdown readyTime={readyTime} />
            ) : (
              getCurrentLevel() && (
                <Question
                  level={getCurrentLevel()}
                  currentPhrase={currentPhrase}
                  showPhrase={showPhrase}
                  inputPhrase={inputPhrase}
                  updateCallback={wpmHandler}
                  submitCallback={postRoundChecking}
                />
              )
            )}
          </>
        ) : (
          <Result marks={gameState.marksCollected} tryAgain={tryAgain} />
        )}
      </div>
    </div>
  );
}

export default App;
