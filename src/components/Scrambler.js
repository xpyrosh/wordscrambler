import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSentence, nextPhrase } from "../redux/actions/sentenceActions";
import PropTypes from "prop-types";
import { Word } from "./Word";

const Scrambler = ({
    sentence: { words, scrambledSentence, level, loading, success },
    getSentence,
    nextPhrase,
}) => {
    const score = level - 1;
    useEffect(() => {
        getSentence(level);

        // eslint-disable-next-line
    }, []);

    const clickHandler = () => {
        nextPhrase(level);
        if (level < 10) {
            getSentence(level + 1);
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
                    <h2>Score: {level - 1}</h2>
                    {words &&
                        words.map((word, index) => {
                            if (index === words.length - 1) {
                                return (
                                    <Word
                                        key={word + index + level}
                                        word={word}
                                        wordIndex={index}
                                    />
                                );
                            } else {
                                return (
                                    <Word
                                        key={word + index + level}
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
    getSentence: PropTypes.func.isRequired,
    nextPhrase: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    sentence: state.sentence,
});

export default connect(mapStateToProps, { getSentence, nextPhrase })(Scrambler);
