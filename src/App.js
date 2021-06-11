import React from "react";

// redux imports
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.scss";
import Scrambler from "./components/Scrambler";

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <Scrambler />
            </div>
        </Provider>
    );
}

export default App;
