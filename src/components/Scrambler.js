import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
    getLevelData,
    updateScore,
    beginTime,
} from "../redux/actions/scramblerActions";
import PropTypes from "prop-types";

import Dialog from "./Dialog";
import { Word } from "./Word";

import bookguy from "../img/bookguy.png";

const Scrambler = ({
    scrambler: {
        words,
        scrambledData,
        level: { hint, pronunciation },
        score,
        loading,
        success,
        totalChars,
        mistakes,
        startTime,
        endTime,
        mode,
    },
    getLevelData,
    updateScore,
    beginTime,
}) => {
    useEffect(() => {
        getLevelData(mode, score);
        beginTime();

        // eslint-disable-next-line
    }, []);

    const nextHandler = () => {
        updateScore(score);
        if (score < 10) {
            getLevelData(mode, score + 1);
        }
    };

    // new focus function to find next blank and focus it when not given an initial spot to focus next from
    // function designed to refocus while enabling keyboard only; before since mouse input was disabled there was no way to continue inputting after tabbing or stopping
    const setFocusV2 = (words) => {
        for (let i = 0; i < words.length; i++) {
            let nextFocus;
            for (let x = 0; x < words[i].length; x++) {
                nextFocus = document.querySelector(
                    `textarea[name=char-${i}-${x}]`
                );

                if (!nextFocus.value) {
                    nextFocus.focus();
                    return;
                }
            }
        }
    };

    return (
        <div className="nes-container is-rounded container">
            {!loading && score < 10 ? (
                <div
                    className="scrambler"
                    onClick={(e) => {
                        e.preventDefault();
                        setFocusV2(words);
                    }}
                >
                    {scrambledData && (
                        <p id="scrambled-word">{scrambledData}</p>
                    )}
                    <Dialog
                        message={hint}
                        pronunciation={pronunciation}
                        mascot={bookguy}
                    />
                    {/* <button type="button" class="nes-btn is-primary">
                        Hint
                    </button> */}
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
                    onClick={nextHandler}
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
