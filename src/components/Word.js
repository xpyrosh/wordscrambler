import React, { useState } from "react";

export const Word = ({ word }) => {
    const [success, setSuccess] = useState();

    const handleChange = (e) => {
        if (e.target.value === word) {
            console.log("Success");
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    };
    return (
        <div>
            <p>{word}</p>
            <input
                type="text"
                name="name"
                required
                maxLength={word.length}
                size="10"
                onChange={handleChange}
                className={`input ${success ? "success" : ""}`}
                autoComplete="off"
            ></input>
        </div>
    );
};
