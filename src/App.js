import React from "react";

// redux imports
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.scss";
import Scrambler from "./components/Scrambler";
import Home from "./components/Home";

function App() {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
}

export default App;
