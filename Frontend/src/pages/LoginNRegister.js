import React, {useState} from 'react';
import LoginNRegisterContainer from "../components/Containers/Login/LoginNRegisterContainer";
import SignUp from "../components/UI/Login/SignUp";
import SignIn from "../components/UI/Login/SignIn";
import Overlay from "../components/UI/Login/Overlay";
import API from "../services";

const LoginNRegister = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] =  useState(null);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        await API.user.login(userInfo);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitted");
        const response = await API.user.login(userInfo.email, userInfo.password);
        if (!response.status) {
            setErrors(response.message)
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const payload = {...userInfo};
        payload[name] = value;
        setUserInfo(payload);
        setErrors(null)
    };

    return (
        <>
            <LoginNRegisterContainer isSignUp={isSignUp}>
                <SignUp
                    handleChange={handleChange}
                    register={userInfo}
                    handleRegisterSubmit={handleRegisterSubmit}
                />
                <SignIn
                    handleLoginSubmit={handleLoginSubmit}
                    handleChange={handleChange}
                    login={userInfo}
                    setIsSignUp={setIsSignUp}
                    error={errors}
                />
                <Overlay
                    setIsSignUp={setIsSignUp}
                />
            </LoginNRegisterContainer>
        </>
    );
};

export default LoginNRegister;
