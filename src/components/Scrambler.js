import React from "react";
import { Word } from "./Word";
import PropTypes from "prop-types";

export const Scrambler = ({ sentence }) => {
    let words = [];
    if (sentence) {
        words = sentence.split(" ");
    }
    // console.log(words);
    return (
        <div className="scrambler">
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
    );
};

Scrambler.propTypes = {
    sentence: PropTypes.string.isRequired,
};
