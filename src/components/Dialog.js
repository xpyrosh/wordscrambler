import React from "react";

const Dialog = ({ message, mascot, pronunciation, levelMistakes }) => {
    return (
        <div className="dialog">
            <img
                src={mascot}
                alt="book guy mascot"
                style={{ maxWidth: "100px" }}
            />
            <div className="nes-balloon from-left">
                <p>{message}</p>
                {pronunciation && levelMistakes >= 3 && <p style={{color: '#24518e'}}>It's pronounced.. "{pronunciation}"</p>}
            </div>
        </div>
    );
};

export default Dialog;
