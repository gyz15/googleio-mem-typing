import React from "react";

const Question = ({
  level,
  currentPhrase,
  showPhrase,
  inputPhrase,
  updateCallback,
  submitCallback,
}) => {
  console.log(level);
  // TODO Meme part
  return (
    <>
      <h3 className="text-5xl text-white font-semibold">
        Question {level.level}
      </h3>
      {showPhrase && (
        <h2 className="text-6xl font-bold underline underline-offset-2 pt-5">
          {currentPhrase}
        </h2>
      )}
      {!showPhrase && (
        <form onSubmit={submitCallback} className="mt-4">
          <input
            type="text"
            value={inputPhrase}
            onChange={(e) => updateCallback(e.target.value)}
            autoFocus
            className="border-2 border-gray-300 p-2 text-lg w-72"
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
  );
};

export default Question;
