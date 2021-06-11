import React, { useState } from "react";
import { Character } from "./Character";

export const Word = ({ word }) => {
    const characters = word.split("");
    return (
        <div className="word">
            {characters &&
                characters.map((char, index) => {
                    return <Character key={index} character={char} />;
                })}
        </div>
    );
};
