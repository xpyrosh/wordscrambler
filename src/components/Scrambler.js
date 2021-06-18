import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getLevelData, nextPhrase } from "../redux/actions/scramblerActions";
import PropTypes from "prop-types";
import { Word } from "./Word";

const Scrambler = ({
    scrambler: { words, scrambledSentence, score, loading, success },
    getLevelData,
    nextPhrase,
}) => {
    // temp mode
    const mode = "mode";
    useEffect(() => {
        getLevelData(mode, score);
        wordsApi();
        // eslint-disable-next-line
    }, []);

    // REFACTOR NEXTPHRASE TO NEXTLEVEL AND MAKE IT DO THE getLevelData/GETLEVEL LOGIC?
    const clickHandler = () => {
        nextPhrase(score);
        if (score < 10) {
            getLevelData(mode, score + 1);
        }
    };

    const wordsApi = async () => {
        try {
            await axios
                .get("https://random-words-api-two.vercel.app/word")
                .then((res) => {
                    console.log(res);
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {!loading && score < 10 ? (
                <div className="scrambler">
                    {scrambledSentence && (
                        <p id="scrambled-word">{scrambledSentence}</p>
                    )}
                    <p>Guess the sentence! Start typing</p>
                    <p>The yellow blocks are meant for spaces</p>
                    <h2>Score: {score}</h2>
                    {words &&
                        words.map((word, index) => {
                            if (index === words.length - 1) {
                                return (
                                    <Word
                                        key={word + index + score}
                                        word={word}
                                        wordIndex={index}
                                    />
                                );
                            } else {
                                return (
                                    <Word
                                        key={word + index + score}
                                        word={word + " "}
                                        hasSpace={true}
                                        wordIndex={index}
                                    />
                                );
                            }
                        })}
                </div>
            ) : score >= 10 ? (
                <h3>You win!</h3>
            ) : (
                <h1>Loading...</h1>
            )}

            {success && score < 10 && (
                <button
                    type="submit"
                    className="next-button"
                    onClick={clickHandler}
                >
                    Next
                </button>
            )}
        </div>
    );
};

Scrambler.propTypes = {
    getLevelData: PropTypes.func.isRequired,
    nextPhrase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    scrambler: state.scrambler,
});

export default connect(mapStateToProps, { getLevelData, nextPhrase })(
    Scrambler
);
