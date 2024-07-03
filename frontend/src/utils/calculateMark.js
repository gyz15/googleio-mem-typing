// INFO:    Calculate marks function that takes in user input string and answer string,
//          returns an integer value.

import { levenshteinDistance } from "./levenShteinDist";

export const calculateMark = (
  inputStr,
  checkStr,
  difficulty,
  timeUsedInSec
) => {
  const accWeight = 0.4;
  const speedWeight = 0.4;
  const difficultyWeight = 0.2;

  // TODO Complete marks weightage (Left difficulty)

  // INFO: Accuracy
  let diff = levenshteinDistance(inputStr, checkStr);
  let accuracy = Math.floor(((checkStr.length - diff) / checkStr.length) * 100);

  // INFO: Speed (WPM)
  const words = inputStr.trim().split(/\s+/).length;
  let speed = words / (timeUsedInSec / 60);

  let mark =
    accWeight * accuracy + speedWeight * speed + difficultyWeight * difficulty;

  mark = mark > 0 ? mark : 0;
  return mark;
};
