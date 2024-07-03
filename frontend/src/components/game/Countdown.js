import React from "react";

const Countdown = ({ readyTime }) => {
  return (
    <h2 className="text-5xl text-white">
      Get ready in <span className="text-black">{readyTime}</span>
      seconds...
    </h2>
  );
};

export default Countdown;
// TODO blinking countdown page
