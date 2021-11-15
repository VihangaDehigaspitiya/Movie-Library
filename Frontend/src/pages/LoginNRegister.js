import React, {useState} from 'react';
import LoginNRegisterContainer from "../components/Containers/Login/LoginNRegisterContainer";
import SignUp from "../components/UI/Login/SignUp";
import SignIn from "../components/UI/Login/SignIn";
import Overlay from "../components/UI/Login/Overlay";

const LoginNRegister = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const [userInfo, setUserInfo] = useState({
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
        const payload = {...userInfo};
        payload[name] = value;
        setUserInfo(payload);
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
                />
                <Overlay
                    setIsSignUp={setIsSignUp}
                />
            </LoginNRegisterContainer>
        </>
    );
};

export default LoginNRegister;
