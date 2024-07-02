import React from 'react'

const Question = ({level, currentPhrase, showPhrase, inputPhrase, updateCallback, submitCallback} ) => {
  console.log(level);
  return (
    <>
      <h3>Question {level.level}</h3>
      {showPhrase && <h2>{currentPhrase}</h2>}
      {!showPhrase && ( 
        <form onSubmit={submitCallback}>
          <input
            type="text"
            value={inputPhrase}
            onChange={(e)=> updateCallback(e.target.value)}
            autoFocus
            style={{ width: "300px", height: "40px", fontSize: "16px" }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  )
}

export default Question;