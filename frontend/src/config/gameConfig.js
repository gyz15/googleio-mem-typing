// INFO Game configuration file 

import { firstLevelPhrase, secondLevelPhrase, thirdLevelPhrase, fourthLevelPhrase, fifthLevelPhrase } from "./phrase";

const GameConfig = {
    levels:
        [
            { level: 1, time: 5000, phrase: firstLevelPhrase,   isMeme:false,   difficulty: 1 },
            { level: 2, time: 3000 , phrase: secondLevelPhrase, isMeme:false,   difficulty: 2 },
            { level: 3, time: 2000, phrase: thirdLevelPhrase,   isMeme:false,   difficulty: 3 },
            { level: 4, time: 1500, phrase: fourthLevelPhrase,  isMeme:true,    difficulty: 4 },
            { level: 5, time: 1000, phrase: fifthLevelPhrase,   isMeme:true,    difficulty: 5 },
        ],
    phrasesList:[
        firstLevelPhrase,
        secondLevelPhrase,
        thirdLevelPhrase,
        fourthLevelPhrase,
        fifthLevelPhrase
    ],
    defaultGameState:{
        level:0,
        inputPhrase:"",
        
        gameStarted:false,
        preGame:false,
        readyTime: 5,
        gameOver:false,

        questionsAnswered:0,
        currentLevel:0,
        marksCollected:0,
    },

    
};

export const { levels, phrasesList  , defaultGameState } = GameConfig;