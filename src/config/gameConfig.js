// INFO Game configuration file 

import { firstLevelPhrase, secondLevelPhrase, thirdLevelPhrase, fourthLevelPhrase, fifthLevelPhrase } from "./phrase";

const GameConfig = {
    levels:
        [
            // TODO: Marks should be awarded to participants that uses lesser time to complete phrases
            { level: 1, time: 5000, phrase: firstLevelPhrase },
            { level: 2, time: 3000 , phrase: secondLevelPhrase },
            { level: 3, time: 2000, phrase: thirdLevelPhrase  },
            { level: 4, time: 1500, phrase: fourthLevelPhrase },
            { level: 5, time: 1000, phrase: fifthLevelPhrase },
        ],
    phrases:[
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
        // marksCollected:0,
    },

    
};

export const { levels, phrases, defaultGameState } = GameConfig;