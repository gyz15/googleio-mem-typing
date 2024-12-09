// INFO Game configuration file

import {
  firstLevelPhrase,
  secondLevelPhrase,
  thirdLevelPhrase,
  fourthLevelPhrase,
  fifthLevelPhrase,
} from "./phrase";
const GameConfig = {
  levels: [
    {
      level: 1,
      time: 5000,
      phrase: firstLevelPhrase,
      isMeme: false,
      bonus: 20,
    },
    {
      level: 2,
      time: 4500,
      phrase: secondLevelPhrase,
      isMeme: false,
      bonus: 30,
    },
    {
      level: 3,
      time: 4000,
      phrase: thirdLevelPhrase,
      isMeme: true,
      bonus: 40,
    },
    {
      level: 4,
      time: 2500,
      phrase: fourthLevelPhrase,
      isMeme: true,
      bonus: 50,
    },
    {
      level: 5,
      time: 2000,
      phrase: fifthLevelPhrase,
      isMeme: true,
      bonus: 60,
    },
  ],
  phrasesList: [
    firstLevelPhrase,
    secondLevelPhrase,
    thirdLevelPhrase,
    fourthLevelPhrase,
    fifthLevelPhrase,
  ],
  defaultGameState: {
    level: 0,
    inputPhrase: "",

    gameStarted: false,
    preGame: false,
    readyTime: 10,
    gameOver: false,

    questionsAnswered: 0,
    currentLevel: 0,
    marksCollected: 0,
  },
};

export const { levels, phrasesList, defaultGameState } = GameConfig;
