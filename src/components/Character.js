import React, { useState } from "react";

export const Character = ({ character }) => {
    const [success, setSuccess] = useState();

    const handleChange = (e) => {
        if (e.target.value === character) {
            console.log("Success");
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    };
    return (
        <div className="character">
            <input
                type="text"
                name="name"
                required
                maxLength="1"
                size="10"
                onChange={handleChange}
                className={`input ${success ? "success" : ""}`}
                autoComplete="off"
            ></input>
        </div>
    );
};
