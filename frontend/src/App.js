import React, { useState, useEffect } from "react";
import "./App.css";
import { defaultGameState, levels, phrasesList} from "./config/gameConfig";
import { selectPhrase } from "./utils/phraseSelector";
import { calculateMark } from "./utils/calculateMark";


function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [readyTime,setReadyTime] = useState(defaultGameState.readyTime)
  const [gameState, setGameState] = useState(defaultGameState);
  const [startedElapsedTime, setStartedElapsedTime] = useState(0);

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
    if (!gameState.preGame && gameState.gameStarted && gameState.level < phrases.length) {
      console.log("Memory phase started");
      setCurrentPhrase(phrases[gameState.level]);
      setShowPhrase(true);
      let currLevel = levels.find((level)=>level.level-1 === gameState.level);

      const timer = setTimeout(() => {
        // INFO: Callback function when memory phase ended 
        console.log("Memory phase ended");
        setShowPhrase(false);
      }, currLevel.time);

      return () => clearTimeout(timer);
    } else if (gameState.level >= phrases.length) {
      setGameState((prevState)=>({...prevState, gameOver:true}));
    }
  }, [gameState.preGame, gameState.level, gameState.gameStarted, phrases]);
 
  // INFO Post-round checking function
  const postRoundChecking = (e) => {
    e.preventDefault();
    // WARNING:   Difficulty not implemented yet
    const elapsedTime = (new Date() - startedElapsedTime) / 1000;
    console.log("Used time: ", elapsedTime);
    let marks = calculateMark(inputPhrase, currentPhrase, 0, elapsedTime);
    setStartedElapsedTime(0);
    setInputPhrase("");
    setGameState({
      ...gameState, 
      level: gameState.level+1, 
      marksCollected: gameState.marksCollected + marks,
    });
  };


  const resetGame = (isNewGame) =>{
    // Reset game state to default game state
    setReadyTime(defaultGameState.readyTime);
    setGameState({
      ...defaultGameState,
      gameStarted: isNewGame,
      preGame:true,
    })
    // Determine the 5 level phrases to be typed by user
    let currRoundPhrase = selectPhrase(phrasesList);
    setPhrases(currRoundPhrase);
    setInputPhrase("");
  }

  const startGame = () => {
    resetGame(true);
  };

  const tryAgain = () => {
    resetGame(false);
  };

  const wpmHandler = (textBoxValue) =>{
    if(inputPhrase ==="" && startedElapsedTime === 0){
      console.log("First typed")
      setStartedElapsedTime(new Date());
    }
    setInputPhrase(textBoxValue)
  }

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
                    onChange={(e)=> wpmHandler(e.target.value)}
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
