import React, {useState} from 'react';
import LoginNRegisterContainer from "../components/Containers/Login/LoginNRegisterContainer";
import SignUp from "../components/UI/Login/SignUp";
import SignIn from "../components/UI/Login/SignIn";
import Overlay from "../components/UI/Login/Overlay";
import API from "../services";
import {toast} from "react-toastify";
import authStore from "../store/auth.store"

const LoginNRegister = (props) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState(null);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        await API.user.register(userInfo)
            .then((res) => {
                console.log(res.data.message, "RES");
                toast.success(res.data.message)
            })
            .catch((err) => {
                setErrors(err.response ? err.response.data.message : 'Something went wrong')
            });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        const response = await API.user.login(userInfo.email, userInfo.password);
        if (!response.status) {
            setErrors(response.message)
            authStore.setState({isAuthenticated: false, user: null})
        } else {
            authStore.setState({isAuthenticated: true, user: response.value})
            props.history.push(`/`);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const payload = {...userInfo};
        payload[name] = value;
        setUserInfo(payload);
        setErrors(null)
    };

    const onChange = (value) => {
        setIsSignUp((value));
        setErrors(null)
    }

    return (
        <>
            <LoginNRegisterContainer isSignUp={isSignUp}>
                <SignUp
                    handleChange={handleChange}
                    register={userInfo}
                    handleRegisterSubmit={handleRegisterSubmit}
                    error={errors}
                />
                <SignIn
                    handleLoginSubmit={handleLoginSubmit}
                    handleChange={handleChange}
                    login={userInfo}
                    setIsSignUp={setIsSignUp}
                    error={errors}
                />
                <Overlay
                    setIsSignUp={(value) => onChange(value)}
                />
            </LoginNRegisterContainer>
        </>
    );
};

export default LoginNRegister;
