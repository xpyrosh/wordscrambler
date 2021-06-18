import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
    getLevelData,
    updateScore,
    beginTime,
} from "../redux/actions/scramblerActions";
import PropTypes from "prop-types";
import { Word } from "./Word";

const Scrambler = ({
    scrambler: {
        words,
        scrambledData,
        score,
        loading,
        success,
        totalChars,
        mistakes,
        startTime,
        endTime,
    },
    getLevelData,
    updateScore,
    beginTime,
    mode,
}) => {
    // temp mode ~ pass mode from home as prop [classic, words, wordsreverse, kanye, trump]
    mode = "mode";

    useEffect(() => {
        getLevelData(mode, score);
        beginTime();
        wordsApi();
        // eslint-disable-next-line
    }, []);

    // REFACTOR updateScore TO NEXTLEVEL AND MAKE IT DO THE getLevelData/GETLEVEL LOGIC?
    const clickHandler = () => {
        updateScore(score);
        if (score < 10) {
            getLevelData(mode, score + 1);
        }
    };

    const wordsApi = async () => {
        try {
            await axios
                .get("https://random-words-api-two.vercel.app/word")
                .then((res) => {
                    // console.log(res);
                });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="nes-container is-rounded container">
            {!loading && score < 10 ? (
                <div className="scrambler">
                    {scrambledData && (
                        <p id="scrambled-word">{scrambledData}</p>
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
                <>
                    <h3>You win!</h3>
                    <br />
                    {/* Calculate input accuracy */}
                    <p>
                        Accuracy:{" "}
                        {((totalChars / (totalChars + mistakes)) * 100).toFixed(
                            2
                        )}
                        %
                    </p>

                    {/* Calculate time elasped */}
                    <p>
                        Time:{" "}
                        {endTime.getMinutes() - startTime.getMinutes() >= 0
                            ? endTime.getMinutes() - startTime.getMinutes()
                            : endTime.getMinutes +
                              (60 - startTime.getMinutes())}
                        :
                        {Math.abs(
                            endTime.getSeconds() - startTime.getSeconds()
                        ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}
                    </p>
                </>
            ) : (
                <h1>Loading...</h1>
            )}

            {success && score < 10 && (
                <button
                    type="submit"
                    className="nes-btn is-success next-button"
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
    updateScore: PropTypes.func.isRequired,
    beginTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    scrambler: state.scrambler,
});

export default connect(mapStateToProps, {
    getLevelData,
    updateScore,
    beginTime,
})(Scrambler);
