import React, { Component } from "react";
import Message from "./Message";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

const GET_CHATS = gql`
    query {
        chats {
            id
            from
            message
        }
    }
`;
const SEND_MESSAGE = gql`
    mutation sendMessage($type: String!) {
        sendMessage(type: $type) {
            id
            type
        }
    }
`;

export class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            message: "",
            entered: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username !== "") {
            this.setState({ entered: true });
        }
    }
    handleChange(e) {
        this.setState({ username: e.target.value });
    }
    render() {
        let input;
        return (
            <div className="container pt-5 mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                {this.state.entered && (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    Chatbox
                                                </div>
                                                <div className="card-body">
                                                    <Query query={GET_CHATS}>
                                                        {({
                                                            loading,
                                                            error,
                                                            data
                                                        }) => {
                                                            if (loading)
                                                                return (
                                                                    <div>
                                                                        Loading...
                                                                    </div>
                                                                );
                                                            if (error)
                                                                return (
                                                                    <div>
                                                                        Error :({" "}
                                                                    </div>
                                                                );
                                                            return data.chats.map(
                                                                chat => (
                                                                    <Message
                                                                        chat={
                                                                            chat
                                                                        }
                                                                    />
                                                                )
                                                            );
                                                        }}
                                                    </Query>
                                                    <Mutation
                                                        mutation={SEND_MESSAGE}>
                                                        {(
                                                            sendMessage,
                                                            { data }
                                                        ) => (
                                                            <div>
                                                                <form
                                                                    onSubmit={e => {
                                                                        e.preventDefault();
                                                                        sendMessage(
                                                                            {
                                                                                variables: {
                                                                                    type:
                                                                                        input.value
                                                                                }
                                                                            }
                                                                        );
                                                                        input.value =
                                                                            "";
                                                                    }}
                                                                    action="">
                                                                    <input
                                                                        ref={node => {
                                                                            input = node;
                                                                        }}
                                                                    />
                                                                    <button type="submit">
                                                                        {" "}
                                                                        Send
                                                                        Message
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        )}
                                                    </Mutation>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!this.state.entered && (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <form
                                                onSubmit={this.handleSubmit}
                                                action=""
                                                method="post">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            type="text"
                                                            placeholder="Enter your username"
                                                            className="form-control"
                                                            value={
                                                                this.state
                                                                    .username
                                                            }
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary">
                                                                Enter
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chatbox;
