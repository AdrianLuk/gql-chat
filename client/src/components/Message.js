import React, { Fragment } from "react";

const Message = props => {
    return (
        <Fragment>
            <dl>
                <dt>{props.chat.from}</dt>
                <dd>{props.chat.message}</dd>
            </dl>
            <hr />
        </Fragment>
    );
};

export default Message;
