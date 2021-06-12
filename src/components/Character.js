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
    sentence: { input, goal },
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

    const setFocus = (e) => {
        // set next focus
        const { maxLength, value, name } = e.target;
        const [inputName, wordIndex, charIndex] = name.split("-");

        if (value.length >= maxLength) {
            let sibilingName;

            // select next sibiling in word or start at next word on input
            if (parseInt(charIndex) === wordSize - 1) {
                sibilingName = `char-${parseInt(wordIndex) + 1}-0`;
            } else {
                sibilingName = `char-${parseInt(wordIndex)}-${
                    parseInt(charIndex) + 1
                }`;
            }

            // fetch the next sibiling
            const nextSibiling = document.querySelector(
                `textarea[name=${sibilingName}]`
            );

            // if we fetched one then focus it
            if (nextSibiling !== null) {
                nextSibiling.focus();
            }
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
            if (e.target.value) {
                removeInput();
            }
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
