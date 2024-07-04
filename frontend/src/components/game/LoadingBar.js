import React, { useState, useEffect } from "react";
import "./Countdown.css";

const LoadingBar = ({ seconds }) => {
  const [count, setCount] = useState(seconds * 10);
  const [progressInPerc, setProgressInPerc] = useState(100);

  useEffect(() => {
    if (count > 0) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
        // setProgressInPerc((count / (seconds * 10)) * 100);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [count, seconds]);

  return (
    <div className="countdown-container mx-auto">
      {/* <div className="countdown-number">{count > 0 ? count : "GO!"}</div> */}
      <div className="loading-bar">
        <div
          className="loading-progress"
          style={{ width: `${(count / (seconds * 10)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
