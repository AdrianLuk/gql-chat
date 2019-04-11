import React, { Component } from "react";
import Message from "./Message";
import gql from "graphql-tag";
import { Query, Mutation, Subscription } from "react-apollo";

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
    mutation sendMessage($from: String!, $message: String!) {
        sendMessage(from: $from, message: $message) {
            id
            from
            message
        }
    }
`;

const MESSAGES_SUBSCRIPTION = gql`
    subscription messageSent {
        messageSent {
            id
            from
            message
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
    subscribeToNewMessages = subscribeToMore => {
        subscribeToMore({
            document: MESSAGES_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                // const newFeedItem = subscriptionData.data.chats;
                // const chatList = [
                //     ...prev.chats,
                //     subscriptionData.data.messageSent
                // ];
                // return chatList.map(chat => (
                return (
                    <Message
                        key={subscriptionData.data.messageSent.id}
                        chat={subscriptionData.data.messageSent}
                    />
                );
                // ));
            }
        });
    };
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
                                                    Adrian Chat
                                                </div>
                                                <div className="card-body">
                                                    <Query query={GET_CHATS}>
                                                        {({
                                                            loading,
                                                            error,
                                                            data,
                                                            subscribeToMore
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
                                                            this.subscribeToNewMessages(
                                                                subscribeToMore
                                                            );
                                                            return data.chats.map(
                                                                chat => (
                                                                    <Message
                                                                        key={
                                                                            chat.id
                                                                        }
                                                                        chat={
                                                                            chat
                                                                        }
                                                                    />
                                                                )
                                                            );
                                                        }}
                                                    </Query>
                                                    {/*<Subscription
                                                        subscription={
                                                            MESSAGES_SUBSCRIPTION
                                                        }>
                                                        {({
                                                            data: {
                                                                messageSent
                                                            },
                                                            loading,
                                                            error
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
                                                            return (
                                                                <Message
                                                                    chat={
                                                                        messageSent
                                                                    }
                                                                />
                                                            );
                                                        }}
                                                    </Subscription>*/}
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
                                                                                        input.value
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
