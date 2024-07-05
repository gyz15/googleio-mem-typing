// INFO:    Calculate marks function that takes in user input string and answer string,
//          returns an integer value.

import { levenshteinDistance } from "./levenShteinDist";

export const calculateMark = (inputStr, checkStr, bonus, timeUsedInSec) => {
  const accWeight = 0.4;
  const speedWeight = 0.4;

  // INFO: Accuracy
  let diff = levenshteinDistance(inputStr, checkStr);
  let accuracy = Math.floor(((checkStr.length - diff) / checkStr.length) * 100);

  // INFO: Speed (WPM)
  const words = inputStr.trim().split(/\s+/).length;
  let speed = words / (timeUsedInSec / 60);

  let mark = accWeight * accuracy + speedWeight * speed;
  if (accuracy === 100) {
    mark += bonus;
    console.log("Bonus added:", mark, bonus);
  }

  return parseFloat(mark.toFixed(2));
};
