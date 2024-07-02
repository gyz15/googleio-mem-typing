import React, { useState, useEffect } from "react";
import { defaultGameState, levels, phrasesList} from "../../config/gameConfig";
import { selectPhrase } from "../../utils/phraseSelector";
import { calculateMark } from "../../utils/calculateMark";
import Question from "./Question";
import Countdown from "./Countdown";


function App() {
  const [phrases, setPhrases] = useState([]);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [inputPhrase, setInputPhrase] = useState("");
  const [showPhrase, setShowPhrase] = useState(false);
  const [readyTime,setReadyTime] = useState(defaultGameState.readyTime);
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

      const timer = setTimeout(() => {
        // INFO: Callback function when memory phase ended 
        console.log("Memory phase ended");
        setShowPhrase(false);
      }, getCurrentLevel().time);

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
    console.log("Difficulty", getCurrentLevel().difficulty);
    
    let marks = calculateMark(inputPhrase, currentPhrase, getCurrentLevel().difficulty, elapsedTime);
    setStartedElapsedTime(0);
    setInputPhrase("");
    setGameState({
      ...gameState, 
      level: gameState.level+1, 
      marksCollected: gameState.marksCollected + marks,
    });
    console.log("next level - ",gameState.level)
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

  const getCurrentLevel = () =>{
    return levels.find((level)=>level.level-1 === gameState.level);
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
            <Countdown readyTime={readyTime}/>
          ) : (
            getCurrentLevel() &&  
            <Question 
              level={getCurrentLevel()}
              currentPhrase={currentPhrase} 
              showPhrase={showPhrase}
              inputPhrase={inputPhrase}
              updateCallback={wpmHandler}
              submitCallback={postRoundChecking} 
            />
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
