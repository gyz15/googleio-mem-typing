import React from "react";

const Result = ({ marks, tryAgain }) => {
  return (
    <>
      <h2>You have completed!</h2>
      <h3>You have scored </h3>
      <h1>{marks} marks</h1>
      <button onClick={tryAgain}>Try Again</button>
    </>
  );
};

export default Result;
