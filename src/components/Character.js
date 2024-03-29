import React, { useState } from "react";

// redux imports
import { connect } from "react-redux";
import {
    setInput,
    removeInput,
    checkSuccess,
    incrementMistakes,
} from "../redux/actions/scramblerActions";
import PropTypes from "prop-types";

const Character = ({
    wordIndex,
    charIndex,
    character,
    wordSize,
    scrambler: { input, goal, words, success },
    hasSpace,
    setInput,
    removeInput,
    checkSuccess,
    incrementMistakes,
}) => {
    const [match, setMatch] = useState();

    const handleChange = (e) => {
        if (
            e.target.value.toLowerCase() === character &&
            input.length <= goal.length
        ) {
            // set local character match
            setMatch(true);
            // check phrase match and dispatch success state if true
            checkSuccess(input, goal);
        } else {
            // to avoid incrementing mistakes on backspace
            setMatch(false);
            if (e.target.value !== ''){
                incrementMistakes();
            }
        }

        setFocus(e);
    };

    const setFocus = (e, isBackSpace) => {
        // set next input focus
        const { maxLength, value, name } = e.target;
        const [inputName, wordIndex, charIndex] = name.split("-");
        let sibilingName;

        // if at initial index dont try to refocus to a spot that doesn't exist
        if (
            parseInt(wordIndex) === 0 &&
            parseInt(charIndex) === 0 &&
            isBackSpace
        )
            return;

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

        // nextSibiling.value = "";

        // if we fetched one then focus it
        if (nextSibiling !== null) {
            nextSibiling.focus();
        }
    };

    const keyedDown = (e) => {
        // check for valid inputs
        // 32: space
        // 189: hyphen
        // 64-91: lowercase
        if (e.keyCode === 32 || e.keyCode === 189 || (e.keyCode > 64 && e.keyCode < 91)) {
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
        else {
            e.preventDefault();
        }
    };

    const keyedUp = (e) => {
        // KEY UP function required to force android deveices to adhere to textarea max length constraints
        // ***** Doesn't work ******
        let max = 5;
        if (e.target.value.length > max) {
            e.target.value(e.target.value.substr(0, max));
        }

        // FOCUS BUTTON if phrase is matched
        // check if final character of final word
        if (
            parseInt(wordIndex) === words.length - 1 &&
            parseInt(charIndex) === wordSize - 1 &&
            success
        ) {
            // find and focus on the next button so we can just hit enter for the next phrase
            const nextButton = document.querySelector(`button[type="submit"]`);

            if (nextButton !== null) {
                nextButton.focus();
            }
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
            onMouseDown={(e) => {
                // if (e.target.name !== "char-0-0") {
                e.preventDefault();
                // }
            }}
            className={`character ${match ? "match" : hasSpace ? "space" : ""}`}
            autoComplete="off"
        />
    );
};

Character.propTypes = {
    setInput: PropTypes.func.isRequired,
    removeInput: PropTypes.func.isRequired,
    checkSuccess: PropTypes.func.isRequired,
    incrementMistakes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    scrambler: state.scrambler,
});

export default connect(mapStateToProps, {
    setInput,
    removeInput,
    checkSuccess,
    incrementMistakes,
})(Character);
