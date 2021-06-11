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
        if (e.target.value === character && input.length <= goal.length) {
            // console.log("Success");
            setSuccess(true);
            checkSuccess(input, goal);
        } else {
            setSuccess(false);
        }
    };

    const keyedDown = (e) => {
        // check for space or a letter
        if (e.keyCode === 32 || (e.keyCode > 64 && e.keyCode < 91)) {
            // console.log(String.fromCharCode(e.keyCode).toLowerCase());
            setInput(String.fromCharCode(e.keyCode).toLowerCase());
        }
        // check for backspace
        else if (e.keyCode === 8) {
            removeInput();
        }
    };
    return (
        <div
            className={`character ${
                success ? "success" : hasSpace ? "space" : ""
            }`}
        >
            <input
                type="text"
                name="name"
                required
                maxLength="1"
                size="1"
                onChange={handleChange}
                onKeyDown={keyedDown}
                className="input"
                autoComplete="off"
            ></input>
        </div>
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
