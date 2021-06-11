import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import { Scrambler } from "./components/Scrambler";

function App() {
    const [sentence, setSentence] = useState();
    const [scrambledSentence, setScrambledSentence] = useState();

    useEffect(() => {
        fetchSentence();

        // eslint-disable-next-line
    }, []);

    // fetch sentence using axios and set to state
    const fetchSentence = async () => {
        try {
            await axios
                .get(`https://api.hatchways.io/assessment/sentences/1`)
                .then((res) => {
                    // console.log(res);
                    setSentence(res.data.data.sentence);
                    setScrambledSentence(
                        scrambleSentence(res.data.data.sentence)
                    );
                });
        } catch (err) {
            console.log(err);
        }
    };

    // Sentence word scrambled
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

    return (
        <div className="App">
            <div className="container">
                {scrambledSentence && (
                    <p id="scrambled-word">{scrambledSentence}</p>
                )}
                <br />
                <p>Guess the sentence! Start typing</p>
                <br />
                <p>The yellow blocks are meant for spaces</p>
                <br />
                <h2>Score: 0</h2>
                {scrambledSentence && (
                    <Scrambler sentence={scrambledSentence} />
                )}
            </div>
        </div>
    );
}

export default App;
