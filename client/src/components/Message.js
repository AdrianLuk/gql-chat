import React, { Fragment } from "react";
// const swearjar = require("swearjar");

const Message = props => {
    // console.log(props);
    if (!props) {
        return <div>Loading...</div>;
    }
    // if (swearjar.profane(props.chat.message)) {
    //     props.addSwear();
    // }
    return (
        <Fragment>
            <dl>
                <div
                    style={{ padding: "0 1.25rem" }}
                    className="row align-items-center justify-content-between">
                    <dd>{props.chat.message}</dd>
                    <div>
                        <dt>{props.chat.from}</dt>
                        <dd>{props.chat.createdAt}</dd>
                    </div>
                </div>
            </dl>
            <hr />
        </Fragment>
    );
};

export default Message;
