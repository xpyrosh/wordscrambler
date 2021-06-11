import { GET_SENTENCE, SET_LOADING } from "../types";
import axios from "axios";

// fetch sentence
export const getSentence = (level) => async (dispatch) => {
    try {
        setLoading();

        await axios
            .get(`https://api.hatchways.io/assessment/sentences/${level}`)
            .then((res) => {
                // console.log(res);
                const sentence = res.data.data.sentence;
                const scrambledSentence = scrambleSentence(
                    res.data.data.sentence
                );

                dispatch({
                    type: GET_SENTENCE,
                    payload: {
                        sentence: sentence,
                        scrambledSentence: scrambledSentence,
                    },
                });
            });
    } catch (err) {
        console.error(err);
    }
};

// sentence scrambler helper function
const scrambleSentence = (sentence) => {
    // break sentence into words
    const words = sentence.split(" ");

    // new sentence
    let newSentence = [];

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

            // add scrambled word to sentence
            newSentence.push(newWord);
        } else {
            // put unscrambled word into sentence
            newSentence.push(word);
        }
    });

    // convert new sentence array to string and return
    newSentence = newSentence.join(" ");
    return newSentence;
};

// set loading
export const setLoading = () => {
    return {
        type: SET_LOADING,
    };
};
