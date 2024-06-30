import React, { useState, useEffect } from "react";
import "./App.css";
import { defaultGameState } from "./config/gameConfig";


function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [readyTime,setReadyTime] = useState(defaultGameState.readyTime)
  const [gameState, setGameState] = useState(defaultGameState);

  // INFO Pregame Countdown Function
  useEffect(() => {
    if (gameState.gameStarted && gameState.preGame && readyTime > 0) {
      const timer = setTimeout(() => setReadyTime((prevTime)=> prevTime - 1 ), 1000);
      return () => clearTimeout(timer);
    } else if (readyTime === 0) {
      setShowPhrase(true);
      setGameState((prevState)=>({...prevState, preGame:false}));
    }
  }, [gameState.gameStarted , gameState.preGame , readyTime]);
  
  // INFO Main game function: Memory Phase
  useEffect(() => {
    // console.log(gameState.preGame, gameState.level, phrases.length);
    if (!gameState.preGame && gameState.gameStarted && gameState.level < phrases.length) {
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
      setGameState((prevState)=>({...prevState, gameOver:true}));
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
        level: gameState.level+1, 
        marksCollected: gameState.marksCollected + 1,
      });
    } else {
      setGameState({...gameState, gameOver:true});
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
    // WARNING: Demo phrases only, DO NOT USE IN PRODUCTION
    setPhrases(["This", "This is", "This is a", "This is a demo", "This is a demo nia"])
    setInputPhrase("");
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
      ) : !gameState.gameOver ? (
        <>
          {gameState.preGame ? (
            <h2>Get ready in {readyTime} seconds...</h2>
          ) : (
            <>
              <h3>Question {gameState.level + 1}</h3>
              {showPhrase && <h2>{currentPhrase}</h2>}
              {!showPhrase && (
                <form onSubmit={postRoundChecking}>
                  <input
                    type="text"
                    value={inputPhrase}
                    onChange={(e)=> setInputPhrase(e.target.value)}
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
            You have completed!
          </h2>
          <h3>You have scored </h3>
          <h1>{gameState.marksCollected} marks</h1>
          <button onClick={tryAgain}>Try Again</button>
        </>
      )}
    </div>
  );
}

export default App;
