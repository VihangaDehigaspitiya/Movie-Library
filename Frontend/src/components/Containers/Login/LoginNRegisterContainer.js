import React from 'react';

const LoginNRegisterContainer = (props) => {
    return (
        <div className="login-n-register">
            <div className={`container ${props.isSignUp ? 'right-panel-active' : ''}`}>
                {props.children}
            </div>
        </div>
    );
};

export default LoginNRegisterContainer;
