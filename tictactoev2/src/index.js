import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import { Provider } from "react-redux";
import { store } from "./components/store";
import { Game } from "./components/game";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Game />
        </React.StrictMode>
    </Provider>
);
