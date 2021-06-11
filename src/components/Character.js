import React, { useState } from "react";

export const Character = ({ character, hasSpace }) => {
    const [success, setSuccess] = useState();

    const handleChange = (e) => {
        if (e.target.value === character) {
            console.log("Success");
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    };

    const keyedDown = (e) => {
        console.log(e.key);
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
