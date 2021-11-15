import React from 'react';
import {Button} from "react-bootstrap";

const Overlay = (props) => {
    return (
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-right">
                    <h1 className="login-n-register__main-title">Welcome Back!</h1>
                    <p className="login-n-register__description-text">To keep connected with us please login
                        with your personal info</p>
                    <Button
                        onClick={() => props.setIsSignUp(true)}
                        className="ghost">
                        Sign Up
                    </Button>
                </div>
                <div className="overlay-panel overlay-left">
                    <h1 className="login-n-register__main-title">Hello, Welcome!</h1>
                    <p className="login-n-register__description-text">Enter your personal details and start
                        journey with us</p>
                    <Button
                        onClick={() => props.setIsSignUp(false)}
                        className="ghost">
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
