import React from "react";

const Result = ({ marks, tryAgain }) => {
  return (
    <>
      <h2 className="text-5xl font-semibold text-white">Congratulations</h2>
      <h3 className="text-2xl font-semibold py-5 text-white">
        You have scored:{" "}
      </h3>
      <h1 className="pb-2 text-2xl">{marks} marks </h1>
      <button
        className="rounded-full bg-yellow-500 text-white px-10 py-2  hover:bg-yellow-600 transform hover:scale-105 transition-transform duration-300"
        onClick={tryAgain}
      >
        Try Again
      </button>
    </>
  );
};

export default Result;
