import React from 'react';
import {Button, Form} from "react-bootstrap";

const SignUp = (props) => {
    return (
        <div className="form-container sign-up-container">
            <Form onSubmit={props.handleRegisterSubmit}>
                <h1 className="login-n-register__main-title mb-2">Create Account</h1>
                <Form.Group className="w-100">
                    <Form.Control
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={props.register.firstName}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={props.register.lastName}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={props.register.email}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="w-100">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={props.register.password}
                        onChange={props.handleChange}
                        required
                    />
                </Form.Group>
                <Button type="submit" className="mt-3">Register</Button>
            </Form>
        </div>
    );
};

export default SignUp;
