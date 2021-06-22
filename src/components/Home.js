import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

// bookguy facial states
import bookguy from "../media/bookguy.png";
import bookguytalk from "../media/bookguytalk.png";

// import music
import backgroundMusic from "../media/backgroundmusic.wav";

import Scrambler from "./Scrambler";
import Dialog from "./Dialog";

// redux imports
import { connect } from "react-redux";
import { setMode } from "../redux/actions/scramblerActions";

const Home = ({ scrambler: { mode }, setMode }) => {
    const defaultMessage = "Let's play a word game. Select a mode.";
    const [message, setMessage] = useState(defaultMessage);
    const [mascot, setMascot] = useState(bookguy);

    const [musicPlaying, setMusicPlaying] = useState(false);
    const backgroundAudio = new Audio(backgroundMusic);
    const musicRef = useRef(backgroundAudio);

    musicRef.current.addEventListener(
        "ended",
        () => {
            musicRef.current.currentTime = 0;
            musicRef.current.play();
        },
        false
    );

    const startMusic = () => {
        if (musicPlaying === false) {
            musicRef.current.play();
        }
        setMusicPlaying(true);
    };

    const pauseMusic = () => {
        if (musicPlaying === true) {
            musicRef.current.pause();
        }
        setMusicPlaying(false);
    };

    return (
        <>
            <div
                className="music-button nes-btn"
                onClick={() => {
                    startMusic();
                }}
                // onMouseUp={() => setMusicPlaying(true)}
                style={{ display: musicPlaying ? "none" : "block" }}
            />
            <div
                className="pause-button nes-btn"
                onClick={() => {
                    pauseMusic();
                }}
                // onMouseUp={() => setMusicPlaying(false)}
                style={{ display: musicPlaying ? "block" : "none" }}
            />
            <div
                className="home-button nes-btn"
                onClick={()=>setMode('menu')}
            />
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
