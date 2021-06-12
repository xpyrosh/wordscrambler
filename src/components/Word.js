import React from "react";
import Character from "./Character";

export const Word = ({ word, hasSpace, wordIndex, sentenceLength }) => {
    const characters = word.split("");

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
