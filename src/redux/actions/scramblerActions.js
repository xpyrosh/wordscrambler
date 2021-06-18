import {
    GET_DATA,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    UPDATE_SCORE,
    INCREMENT_MISTAKES,
} from "../types";
import axios from "axios";

// FETCH LEVEL DATA
export const getLevelData = (mode, score) => async (dispatch) => {
    try {
        setLoading();

        const level = score + 1;
        if (level <= 10) {
            await axios
                .get(`https://api.hatchways.io/assessment/sentences/${level}`)
                .then((res) => {
                    // console.log(res);
                    const data = res.data.data.sentence;
                    const scrambledData = scrambleData(res.data.data.sentence);

                    dispatch({
                        type: GET_DATA,
                        payload: {
                            data: data.toLowerCase(),
                            hint: "Guess the sentence! Start typing",
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
