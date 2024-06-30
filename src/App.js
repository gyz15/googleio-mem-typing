import React, { useState, useEffect } from "react";
import "./App.css";
import { defaultGameState } from "./config/gameConfig";

const initialPhrases = [
  "Lah",
  "Makan angin",
  "Syok sendiri",
  "Tapau",
  "Goyang kaki",
  "Fuyoh",
  "Kantoi",
  "Kopi tiam",
  "Terer",
  "Abuden",
];

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [gameOver, setGameOver] = useState(false);
   const [readyTime,setReadyTime] = useState(defaultGameState.readyTime)
  const [initialCountdown, setInitialCountdown] = useState(true);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [gameState, setGameState] = useState(defaultGameState);

  useEffect(() => {
    console.log(gameState.gameStarted, gameState.preGame, gameState.readyTime);
    if (gameState.gameStarted && gameState.preGame && readyTime > 0) {
      console.log("pregame loading");
      const timer = setTimeout(() => setReadyTime((prevTime)=> prevTime - 1 ), 1000);
      return () => clearTimeout(timer);
    } else if (readyTime === 0) {
      setGameState({...gameState, preGame:false})
    }
  }, [gameState.gameStarted , gameState.preGame , readyTime]);

  useEffect(() => {
    if (!initialCountdown && currentLevel < phrases.length) {
      setCurrentPhrase(phrases[currentLevel]);
      setShowPhrase(true);

      const timer = setTimeout(() => {
        setShowPhrase(false);
      // TODO Dynamic Timing for each level
      // }, levels[currentLevel].time); 
      }, 5000);

      return () => clearTimeout(timer);
    } else if (currentLevel >= phrases.length) {
      setGameOver(true);
    }
  }, [currentLevel, initialCountdown, phrases]);

  const handleChange = (e) => {
    setInputPhrase(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPhrase.toLowerCase() === currentPhrase.toLowerCase()) {
      setInputPhrase("");
      setCurrentLevel(currentLevel + 1);
      setQuestionsAnswered(questionsAnswered + 1);
    } else {
      setGameOver(true);
    }
  };


  const resetGame = (isNewGame) =>{
    // Reset game state to default game state
    setGameState({
      ...defaultGameState,
      gameStarted: isNewGame,
      preGame:true,
    })
    // Determine the 5 level phrases to be typed by user
    
  }

  const startGame = () => {
    resetGame(true);
  };

  const tryAgain = () => {
    resetGame(false);
  };

  return (
    <div className="App">
      <h1>Memory Typing Game</h1>
      {!gameState.gameStarted ? (
        <>
        <button onClick={startGame}>Start Game</button>
        </>
      ) : !defaultGameState.gameOver ? (
        <>
          {initialCountdown ? (
            <h2>Get ready in {readyTime} seconds...</h2>
          ) : (
            <>
              <h3>Question {currentLevel + 1}</h3>
              {showPhrase && <h2>{currentPhrase}</h2>}
              {!showPhrase && (
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={inputPhrase}
                    onChange={handleChange}
                    autoFocus
                    style={{ width: "300px", height: "40px", fontSize: "16px" }}
                  />
                  <button type="submit">Submit</button>
                </form>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <h2>
            Game Over! {questionsAnswered >= 3 ? "You Win!" : "Try Again!"}
          </h2>
          <button onClick={tryAgain}>Try Again</button>
        </>
      )}
    </div>
  );
}

export default App;
