import React from "react";
import { Redirect, Route } from "react-router-dom";

export default props => {
    const { auth, component: Component, redirect: pathname, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname, state: { from: props.location } }} />
                )
            }
        />
    );
};
