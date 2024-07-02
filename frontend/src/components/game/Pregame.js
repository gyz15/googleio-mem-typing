import React from 'react'

const Pregame = ({startGame}) => {
  return (
    <>
        <h1>Memory Typing Game</h1>
        <button onClick={startGame}>Start Game</button>
    </>
  )
}

export default Pregame;