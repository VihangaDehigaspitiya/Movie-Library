import React from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = props => {
    const { auth, component: Component, redirect: pathname, ...rest } = props;

    return (
        <Route
            {...rest}
            render={props =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={pathname} />
                )
            }
        />
    );
};

export default ProtectedRoute;
