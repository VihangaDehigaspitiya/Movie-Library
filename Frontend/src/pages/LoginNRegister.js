import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";

const LoginNRegister = () => {

    const [isSignUp, setIsSignUp] = useState(false);

    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const payload = {...register};
        payload[name] = value;
        setRegister(payload);
    };

    return (
        <div className="login-n-register">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
                <div className="form-container sign-up-container">
                    <Form onSubmit={handleRegisterSubmit}>
                        <h1 className="login-n-register__main-title mb-2">Create Account</h1>
                        <Form.Group className="w-100">
                            <Form.Control
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={register.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={register.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={register.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-3">Register</Button>
                    </Form>
                </div>
                <div className="form-container sign-in-container">
                    <Form onSubmit={handleLoginSubmit}>
                        <h1 className="login-n-register__main-title mb-2">Sign in</h1>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={register.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={register.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-3">Sign In</Button>
                    </Form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 className="login-n-register__main-title">Welcome Back!</h1>
                            <p className="login-n-register__description-text">To keep connected with us please login
                                with your personal info</p>
                            <Button
                                onClick={() => setIsSignUp(true)}
                                className="ghost">
                                Sign Up
                            </Button>
                        </div>
                        <div className="overlay-panel overlay-left">
                            <h1 className="login-n-register__main-title">Hello, Welcome!</h1>
                            <p className="login-n-register__description-text">Enter your personal details and start
                                journey with us</p>
                            <Button
                                onClick={() => setIsSignUp(false)}
                                className="ghost">
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginNRegister;
