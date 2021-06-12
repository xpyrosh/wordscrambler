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
    sentence: { input, goal },
    character,
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
            name="name"
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
