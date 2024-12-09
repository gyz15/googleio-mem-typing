import React from "react";
import LoadingBar from "./LoadingBar";

const Question = ({
  level,
  currentPhrase,
  showPhrase,
  inputPhrase,
  updateCallback,
  submitCallback,
}) => {
  // TODO Meme part
  return (
    <>
      <h3 className="text-5xl text-white font-semibold">
        Question {level.level}
      </h3>
      {showPhrase && (
        <>
          {level.isMeme && (
            <div className="h-80">
              <img
                src={require(`../../imgQuestion/${level.level}-${currentPhrase}.jpg`)}
                className="h-3/5 mx-auto mt-5"
                alt="question"
              />
            </div>
          )}
          <h2 className="text-4xl font-bold underline pt-5 select-none">
            {currentPhrase}
          </h2>
          <LoadingBar seconds={level.time / 1000} />
        </>
      )}
      {!showPhrase && (
        <form onSubmit={submitCallback} className="mt-4">
          <input
            type="text"
            value={inputPhrase}
            onChange={(e) => updateCallback(e.target.value)}
            autoFocus
            className="border-2 border-gray-300 p-2 text-lg w-80"
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
