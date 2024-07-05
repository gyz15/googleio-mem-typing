import React from "react";

const Countdown = ({ readyTime }) => {
  return (
    <>
      <h2 className="text-5xl text-white">
        Get ready in <span className="text-black">{readyTime}</span> seconds...
      </h2>
      <div className="mt-10">
        <h2 className="text-3xl text-left">Rules:</h2>
        <p className="text-2xl text-left">
          1. Memorize the <span className="underline">underlined</span> phrase
          in limited time.
        </p>
        <p className="text-2xl text-left">
          2. Type as fast as you could at the text box after countdown. (Case
          Sensitive)
        </p>
      </div>
    </>
  );
};

export default Countdown;
// TODO blinking countdown page
