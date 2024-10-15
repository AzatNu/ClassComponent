import { Field } from "./field/field.js";
import { Information } from "../components/information/information.js";
import { Component } from "react";
export class GameLayout extends Component {
    render() {
        return (
            <>
                <Information />
                <Field />
            </>
        );
    }
}
