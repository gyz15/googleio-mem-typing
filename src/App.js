import React, { useState, useEffect } from "react";
import "./App.css";

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

const levels = [
  { level: 1, time: 5000 },
  { level: 2, time: 3000 },
  { level: 3, time: 2000 },
  { level: 4, time: 1500 },
  { level: 5, time: 1000 },
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
  const [gameStarted, setGameStarted] = useState(false);
  const [readyTime, setReadyTime] = useState(5);
  const [initialCountdown, setInitialCountdown] = useState(true);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  useEffect(() => {
    if (gameStarted && initialCountdown && readyTime > 0) {
      const timer = setTimeout(() => setReadyTime(readyTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (readyTime === 0) {
      setInitialCountdown(false);
    }
  }, [gameStarted, readyTime, initialCountdown]);

  useEffect(() => {
    if (!initialCountdown && currentLevel < phrases.length) {
      setCurrentPhrase(phrases[currentLevel]);
      setShowPhrase(true);

      const timer = setTimeout(() => {
        setShowPhrase(false);
      }, levels[currentLevel].time);

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

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setCurrentLevel(0);
    setInputPhrase("");
    setReadyTime(5);
    setInitialCountdown(true);
    setQuestionsAnswered(0);
    setPhrases(shuffleArray(initialPhrases).slice(0, 3)); // Select 3 random phrases
  };

  const tryAgain = () => {
    setGameOver(false);
    setCurrentLevel(0);
    setInputPhrase("");
    setReadyTime(5);
    setInitialCountdown(true);
    setQuestionsAnswered(0);
    setPhrases(shuffleArray(initialPhrases).slice(0, 3)); // Select 3 random phrases
  };

  return (
    <div className="App">
      <h1>Memory Typing Game</h1>
      {!gameStarted ? (
        <button onClick={startGame}>Start Game</button>
      ) : !gameOver ? (
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
