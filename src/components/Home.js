import React, { useState } from "react";
import bookguy from "../img/bookguy.png";
import bookguytalk from "../img/bookguytalk.png";

const Home = () => {
    const defaultMessage = "Let's play a word game. Select a mode.";
    const [message, setMessage] = useState(defaultMessage);
    const [mascot, setMascot] = useState(bookguy);
    return (
        <div className="home">
            <h1 className="title">SCRAMBLER GAME</h1>
            <div className="nes-container is-rounded container">
                <div className="dialog">
                    <img
                        src={mascot}
                        alt="book guy mascot"
                        style={{ maxWidth: "100px" }}
                    />
                    <div className="nes-balloon from-left">
                        <p>{message}</p>
                    </div>
                </div>
                <div className="menu">
                    <button
                        className="nes-btn is-primary"
                        onMouseEnter={() => {
                            setMessage("Classic Mode. Deciper the messages.");
                            setMascot(bookguytalk);
                        }}
                        onMouseLeave={() => {
                            setMessage(defaultMessage);
                            setMascot(bookguy);
                        }}
                    >
                        Classic
                    </button>
                    <button
                        className="nes-btn is-warning"
                        onMouseEnter={() => {
                            setMessage(
                                "I'll provide the description, figure out the word."
                            );
                            setMascot(bookguytalk);
                        }}
                        onMouseLeave={() => {
                            setMessage(defaultMessage);
                            setMascot(bookguy);
                        }}
                    >
                        Complex Words
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
