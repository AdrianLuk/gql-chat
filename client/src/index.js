import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { withClientState } from "apollo-link-state";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

// Pass your GraphQL endpoint to uri
// const client = new ApolloClient({
//     uri: "http://localhost:4000"
// });

const httpLink = new HttpLink({
    uri: "http://localhost:4000",
    credentials: "same-origin"
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000",
    options: {
        reconnect: true
    }
});
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

const ApolloApp = AppComponent => (
    <ApolloProvider client={client}>
        <AppComponent />
    </ApolloProvider>
);

ReactDOM.render(ApolloApp(App), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
