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
    useEffect(() => {
        getSentence(level);

        // eslint-disable-next-line
    }, []);

    const clickHandler = () => {
        nextPhrase(level);
        getSentence(level + 1);
    };

    return (
        <div>
            {!loading ? (
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
                                return <Word key={index} word={word} />;
                            } else {
                                return (
                                    <Word
                                        key={index}
                                        word={word + " "}
                                        hasSpace={true}
                                    />
                                );
                            }
                        })}
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
            {success && (
                <button className="next-button" onClick={clickHandler}>
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
