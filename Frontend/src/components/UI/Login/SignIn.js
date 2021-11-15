import React from 'react';
import {Button, Form, Alert} from "react-bootstrap";

const SignIn = (props) => {
    return (
        <div className="form-container sign-in-container">
            <Form onSubmit={props.handleLoginSubmit}>
                <h1 className="login-n-register__main-title mb-2">Sign in</h1>
                {
                    props.error && <Alert className="custom-alert" variant='danger'>{props.error}</Alert>
                }

                <Form.Group className="w-100">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={props.login.email}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={props.login.password}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="mt-3">Sign In</Button>
            </Form>
        </div>
    );
};

export default SignIn;
