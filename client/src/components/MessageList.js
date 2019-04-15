import React, { Component } from "react";
import Message from "./Message";

export class MessageList extends Component {
    componentDidMount() {
        this.props.subscribeToNewMessages();
    }

    render() {
        const { data } = this.props;
        if (!data.chats) {
            return <div>Loading...</div>;
        }
        return data.chats.map(chat => <Message key={chat.id} chat={chat} />);
        // return <div />;
    }
}

export default MessageList;
