import React, { Component } from "react";
import "./App.css";
// import { gql } from "apollo-boost";
// import { Query } from "react-apollo";
import Chatbox from "./components/Chatbox";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Chatbox />
            </div>
        );
    }
}

export default App;
