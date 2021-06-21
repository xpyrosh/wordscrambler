import React, { useState } from "react";
import PropTypes from "prop-types";

// bookguy facial states
import bookguy from "../img/bookguy.png";
import bookguytalk from "../img/bookguytalk.png";

import backgroundMusic from "../img/backgroundmusic.wav";

import Scrambler from "./Scrambler";
import Dialog from "./Dialog";

// redux imports
import { connect } from "react-redux";
import { setMode } from "../redux/actions/scramblerActions";

const Home = ({ scrambler: { mode }, setMode }) => {
    const defaultMessage = "Let's play a word game. Select a mode.";
    const [message, setMessage] = useState(defaultMessage);
    const [mascot, setMascot] = useState(bookguy);
    const [playMusic, setPlayMusic] = useState(false);

    return (
        <>
            <div className="music-button">
                <audio autoPlay={playMusic} loop={true} controls>
                    <source src={backgroundMusic} type="audio/wav" />
                </audio>
            </div>
            {mode === "menu" ? (
                <div className="home">
                    <h1 className="title">SCRAMBLER GAME</h1>
                    <div className="nes-container is-rounded container">
                        <Dialog message={message} mascot={mascot} />
                        <div className="menu">
                            <button
                                className="nes-btn is-primary"
                                onMouseEnter={() => {
                                    setMessage(
                                        "Classic Mode. Deciper the messages."
                                    );
                                    setMascot(bookguytalk);
                                }}
                                onMouseLeave={() => {
                                    setMessage(defaultMessage);
                                    setMascot(bookguy);
                                }}
                                onClick={() => {
                                    setMode("classic");
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
                                onClick={() => {
                                    setMode("words");
                                }}
                            >
                                Complex Words
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <Scrambler />
            )}
        </>
    );
};

Home.propTypes = {
    setMode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // define state
    scrambler: state.scrambler,
});

export default connect(mapStateToProps, { setMode })(Home);
