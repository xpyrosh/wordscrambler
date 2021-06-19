import React from "react";

const Dialog = ({ message, mascot, pronunciation }) => {
    return (
        <div className="dialog">
            <img
                src={mascot}
                alt="book guy mascot"
                style={{ maxWidth: "100px" }}
            />
            <div className="nes-balloon from-left">
                <p>{message}</p>
                {pronunciation && <p>It's pronounced.. "{pronunciation}"</p>}
            </div>
        </div>
    );
};

export default Dialog;
