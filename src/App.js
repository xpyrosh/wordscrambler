import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [sentence, setSentence] = useState();

    useEffect(() => {
        fetchSentence();
    }, []);

    const fetchSentence = async () => {
        try {
            await axios
                .get(`https://api.hatchways.io/assessment/sentences/1`)
                .then((res) => {
                    console.log(res);
                    setSentence(res.data.data.sentence);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return <div className="App">{sentence && <h1>{sentence}</h1>}</div>;
}

export default App;
