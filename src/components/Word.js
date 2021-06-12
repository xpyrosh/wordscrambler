import React, { useEffect } from "react";
import Character from "./Character";

export const Word = ({ word, hasSpace, wordIndex, sentenceLength }) => {
    const characters = word.split("");

    useEffect(() => {
        startFocus();
    }, []);

    const startFocus = () => {
        const start = document.querySelector(`textarea[name=char-0-0]`);

        if (start !== null) {
            start.focus();
        }
    };

    return (
        <div className="word">
            {characters &&
                characters.map((char, index) => {
                    return (
                        <Character
                            key={index}
                            wordIndex={wordIndex}
                            wordSize={word.length}
                            charIndex={index}
                            character={char}
                            hasSpace={
                                index === characters.length - 1 && hasSpace
                            }
                        />
                    );
                })}
        </div>
    );
};
