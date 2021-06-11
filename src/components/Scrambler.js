import React from "react";
import { Word } from "./Word";

export const Scrambler = ({ sentence }) => {
    const words = sentence.split(" ");
    // console.log(words);
    return (
        <div className="scrambler">
            {words &&
                words.map((word, index) => {
                    if (index === words.length - 1) {
                        return <Word key={index} word={word} />;
                    } else {
                        return (
                            <Word
                                key={index}
                                word={word + " "}
                                hasSpace={true}
                            />
                        );
                    }
                })}
        </div>
    );
};
