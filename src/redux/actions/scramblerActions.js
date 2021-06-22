import {
    GET_DATA,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    UPDATE_SCORE,
    INCREMENT_MISTAKES,
    START_TIME,
    SET_MODE,
    CLEAR_GAME
} from "../types";
import axios from "axios";

// FETCH LEVEL DATA
export const getLevelData = (mode, score) => async (dispatch) => {
    try {
        setLoading();

        let fetchURL, data, scrambledData, hint, pronunciation;

        if (mode === "classic") {
            const level = score + 1;
            fetchURL = `https://api.hatchways.io/assessment/sentences/${level}`;
        } else if (mode === "words") {
            fetchURL = "https://random-words-api-two.vercel.app/word";
        }

        const level = score + 1;
        if (level <= 10) {
            await axios.get(fetchURL).then((res) => {
                // console.log(res);

                if (mode === "classic") {
                    data = res.data.data.sentence;
                    scrambledData = scrambleData(res.data.data.sentence);
                    hint = "Decipher the sentence.";
                    pronunciation = null;
                } else if (mode === "words") {
                    data = res.data[0].word;
                    scrambledData = scrambleData(res.data[0].word);
                    hint = res.data[0].definition;
                    pronunciation = res.data[0].pronunciation;
                }

                dispatch({
                    type: GET_DATA,
                    payload: {
                        data: data.toLowerCase(),
                        hint: hint,
                        pronunciation: pronunciation,
                        chars: data.split("").length,
                        scrambledData: scrambledData.toLowerCase(),
                    },
                });
            });
        }
    } catch (err) {
        console.error(err);
    }
};

// START TIME
export const beginTime = () => (dispatch) => {
    try {
        dispatch({
            type: START_TIME,
            payload: new Date(),
        });
    } catch (err) {
        console.error(err);
    }
};

// SET INPUT
export const setInput = (input) => async (dispatch) => {
    try {
        dispatch({
            type: SET_INPUT,
            payload: input,
        });
    } catch (err) {
        console.error(err);
    }
};

// SET GAME MODE
export const setMode = (mode) => (dispatch) => {
    try {
        dispatch({
            type: SET_MODE,
            payload: mode,
        });
    } catch (err) {
        console.error(err);
    }
};

// CHECK SUCCESS
export const checkSuccess = (input, goal) => async (dispatch) => {
    try {
        // test array equality
        if (input.length === goal.length) {
            for (let i = 0; i < input.length; i++) {
                if (input[i] !== goal[i]) return false;
            }
            // if the two arrays match we have our success condition
            dispatch({
                type: SET_SUCCESS,
            });
        }
    } catch (err) {
        console.error(err);
    }
};

// REMOVE INPUT
export const removeInput = () => {
    try {
        return {
            type: REMOVE_INPUT,
        };
    } catch (err) {
        console.error(err);
    }
};

// UPDATE SCORE
export const updateScore = () => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_SCORE,
        });
    } catch (err) {
        console.error(err);
    }
};

// UPDATE/INCREMENT MISTAKES
export const incrementMistakes = () => async (dispatch) => {
    try {
        dispatch({
            type: INCREMENT_MISTAKES,
        });
    } catch (err) {
        console.error(err);
    }
};

// CLEAR GAME STATE
export const clearGame = () => (dispatch) => {
    try {
        dispatch({
            type: CLEAR_GAME,
        });
    } catch (err) {
        console.error(err)
    }
}

// SET LOADING
export const setLoading = () => {
    console.log("Loading...");
    return {
        type: SET_LOADING,
    };
};

// sentence scrambler helper function
const scrambleData = (data) => {
    // break data into words
    const words = data.split(" ");

    // new data
    let newData = [];

    // do something for each word
    words.forEach((word) => {
        // if the word is bigger than 2 characters, shuffle it
        if (word.length > 2) {
            // break the word into characters
            word = word.split("");

            // take the first and last letters out since they won't be scrambled
            let firstLetter = word.shift();
            let lastLetter = word.pop();

            // create a new scrambled word and give it the first fixed letter
            let newWord = [];
            newWord.push(firstLetter);

            // while we still have letters in remaining in the word randomly remove them and append to new word
            do {
                let i = Math.floor(Math.random() * word.length);
                let letter = word.splice(i, 1);
                newWord.push(letter[0]);
            } while (word.length > 0);

            // add the last letter back
            newWord.push(lastLetter);

            // convert mixed letters back into a word
            newWord = newWord.join("");

            // add scrambled word to data
            newData.push(newWord);
        } else {
            // put unscrambled word into data
            newData.push(word);
        }
    });

    // convert new data array to string and return
    newData = newData.join(" ");
    return newData;
};
