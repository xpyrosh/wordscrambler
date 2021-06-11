import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSentence } from "../redux/actions/sentenceActions";
import PropTypes from "prop-types";
import { Word } from "./Word";

const Scrambler = ({
    sentence: { words, scrambledSentence, level, loading, success },
    getSentence,
}) => {
    // // split sentence into individual words once we have it
    // let words = [];
    // if (sentence) {
    //     words = sentence.split(" ");
    // }
    // console.log(words);

    useEffect(() => {
        getSentence(level);

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            {!loading && !success ? (
                <div className="scrambler">
                    {scrambledSentence && (
                        <p id="scrambled-word">{scrambledSentence}</p>
                    )}
                    <p>Guess the sentence! Start typing</p>
                    <p>The yellow blocks are meant for spaces</p>
                    <h2>Score: {level - 1}</h2>
                    {words &&
                        words.map((word, index) => {
                            console.log(word);
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
        </div>
    );
};

Scrambler.propTypes = {
    getSentence: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    sentence: state.sentence,
});

export default connect(mapStateToProps, { getSentence })(Scrambler);
