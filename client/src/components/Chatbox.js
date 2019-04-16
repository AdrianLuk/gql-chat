import React, { Component } from "react";
import MessageList from "./MessageList";
// import SwearCount from "./SwearCount";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_CHATS = gql`
    query ChatList {
        chats {
            id
            from
            message
            createdAt
        }
    }
`;
const SEND_MESSAGE = gql`
    mutation sendMessage(
        $from: String!
        $message: String!
        $createdAt: String!
    ) {
        sendMessage(from: $from, message: $message, createdAt: $createdAt) {
            id
            from
            message
            createdAt
        }
    }
`;

const MESSAGES_SUBSCRIPTION = gql`
    subscription messageSent {
        messageSent {
            id
            from
            message
            createdAt
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
            // swearCount: 0
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
    // handleSwear = () => {
    //     this.setState({ swearCount: this.state.swearCount + 1 });
    // };
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
                                                    Adrian Chat{" "}
                                                    {/* <SwearCount
                                                        swearCount={
                                                            this.state
                                                                .swearCount
                                                        }
                                                    /> */}
                                                </div>
                                                <div className="card-body">
                                                    <Query query={GET_CHATS}>
                                                        {({
                                                            subscribeToMore,
                                                            ...chats
                                                        }) => (
                                                            <MessageList
                                                                {...chats}
                                                                subscribeToNewMessages={() =>
                                                                    subscribeToMore(
                                                                        {
                                                                            document: MESSAGES_SUBSCRIPTION,
                                                                            updateQuery: (
                                                                                prev,
                                                                                {
                                                                                    subscriptionData
                                                                                }
                                                                            ) => {
                                                                                if (
                                                                                    !subscriptionData.data
                                                                                )
                                                                                    return prev;
                                                                                const newMessage =
                                                                                    subscriptionData
                                                                                        .data
                                                                                        .messageSent;
                                                                                return Object.assign(
                                                                                    {},
                                                                                    prev,
                                                                                    {
                                                                                        chats: [
                                                                                            ...prev.chats,
                                                                                            newMessage
                                                                                        ].slice(
                                                                                            -10
                                                                                        )
                                                                                    }
                                                                                );
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                    </Query>

                                                    <Mutation
                                                        mutation={SEND_MESSAGE}>
                                                        {(
                                                            sendMessage,
                                                            { data }
                                                        ) => (
                                                            <div>
                                                                <form
                                                                    className="form"
                                                                    onSubmit={e => {
                                                                        e.preventDefault();
                                                                        sendMessage(
                                                                            {
                                                                                variables: {
                                                                                    from: this
                                                                                        .state
                                                                                        .username,
                                                                                    message:
                                                                                        input.value,
                                                                                    createdAt: new Date().toLocaleTimeString()
                                                                                }
                                                                            }
                                                                        );
                                                                        input.value =
                                                                            "";
                                                                    }}
                                                                    action="">
                                                                    <div className="form-group">
                                                                        <div className="input-group">
                                                                            <input
                                                                                className="form-control"
                                                                                ref={node => {
                                                                                    input = node;
                                                                                }}
                                                                                onChange={e => {
                                                                                    this.setState(
                                                                                        {
                                                                                            message:
                                                                                                e
                                                                                                    .target
                                                                                                    .value
                                                                                        }
                                                                                    );
                                                                                }}
                                                                            />
                                                                            <div className="input-group-append">
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary">
                                                                                    {" "}
                                                                                    Send
                                                                                    Message
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
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
