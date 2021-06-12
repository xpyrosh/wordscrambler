import React, { useState } from "react";

// redux imports
import { connect } from "react-redux";
import {
    setInput,
    removeInput,
    checkSuccess,
} from "../redux/actions/sentenceActions";
import PropTypes from "prop-types";

const Character = ({
    wordIndex,
    charIndex,
    character,
    wordSize,
    sentenceLength,
    sentence: { input, goal, words },
    hasSpace,
    setInput,
    removeInput,
    checkSuccess,
}) => {
    const [success, setSuccess] = useState();

    const handleChange = (e) => {
        if (
            e.target.value.toLowerCase() === character &&
            input.length <= goal.length
        ) {
            // set local character success
            setSuccess(true);
            // check phrase success and dispatch success state if true
            checkSuccess(input, goal);
        } else {
            setSuccess(false);
        }

        setFocus(e);
    };

    const setFocus = (e, isBackSpace) => {
        // set next focus
        const { maxLength, value, name } = e.target;
        const [inputName, wordIndex, charIndex] = name.split("-");
        let sibilingName;

        if (value.length >= maxLength) {
            // select next sibiling in word or start at next word on input
            if (parseInt(charIndex) === wordSize - 1) {
                sibilingName = `char-${parseInt(wordIndex) + 1}-0`;
            } else {
                sibilingName = `char-${parseInt(wordIndex)}-${
                    parseInt(charIndex) + 1
                }`;
            }
        } else {
            // if we backspace without a character
            if (isBackSpace) {
                // if we are at the first character we need to find the index of the last character of the previous word
                if (parseInt(charIndex) === 0) {
                    let newWordIndex = words[wordIndex - 1].length;

                    sibilingName = `char-${
                        parseInt(wordIndex) - 1
                    }-${newWordIndex}`;
                    console.log(sibilingName);
                }
                // if we're not the last character just move to the previous character
                else {
                    sibilingName = `char-${parseInt(wordIndex)}-${
                        parseInt(charIndex) - 1
                    }`;
                }
            }
        }

        // fetch the next sibiling
        const nextSibiling = document.querySelector(
            `textarea[name=${sibilingName}]`
        );

        // if we fetched one then focus it
        if (nextSibiling !== null) {
            nextSibiling.focus();
        }
    };

    const keyedDown = (e) => {
        // check for space or a letter
        if (e.keyCode === 32 || (e.keyCode > 64 && e.keyCode < 91)) {
            if (!e.target.value) {
                setInput(String.fromCharCode(e.keyCode).toLowerCase());
            }
        }
        // check for backspace
        else if (e.keyCode === 8) {
            removeInput();
            setFocus(e, true);
        }
        // disable enter on text area
        else if (e.keyCode == 13) {
            e.preventDefault();
        }
    };

    const keyedUp = (e) => {
        // KEY UP function required to force android deveices to adhere to textarea max length constraints
        let max = 5;
        if (e.target.value.length > max) {
            e.target.value(e.target.value.substr(0, max));
        }
    };
    return (
        <textarea
            type="text"
            name={`char-${wordIndex}-${charIndex}`}
            rows="1"
            cols="1"
            required
            maxLength="1"
            size="1"
            onChange={handleChange}
            onKeyDown={keyedDown}
            onKeyUp={keyedUp}
            className={`character ${
                success ? "success" : hasSpace ? "space" : ""
            }`}
            autoComplete="off"
        />
    );
};

Character.propTypes = {
    setInput: PropTypes.func.isRequired,
    removeInput: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    sentence: state.sentence,
});

export default connect(mapStateToProps, {
    setInput,
    removeInput,
    checkSuccess,
})(Character);
