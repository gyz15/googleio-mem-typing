// INFO Game configuration file 

import { firstLevelPhrase, secondLevelPhrase, thirdLevelPhrase, fourthLevelPhrase, fifthLevelPhrase } from "./phrase";

const GameConfig = {
    levels:
        [
            // TODO: Marks should be awarded to participants that uses lesser time to complete phrases
            { level: 1, time: 5000, phrase: firstLevelPhrase, isMeme:false },
            { level: 2, time: 3000 , phrase: secondLevelPhrase, isMeme:false },
            { level: 3, time: 2000, phrase: thirdLevelPhrase, isMeme:false  },
            { level: 4, time: 1500, phrase: fourthLevelPhrase, isMeme:true },
            { level: 5, time: 1000, phrase: fifthLevelPhrase, isMeme:true },
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