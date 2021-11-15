import React, {useState} from 'react';
import LoginNRegisterContainer from "../components/Containers/Login/LoginNRegisterContainer";
import SignUp from "../components/UI/Login/SignUp";
import SignIn from "../components/UI/Login/SignIn";
import Overlay from "../components/UI/Login/Overlay";

const NewLoginNRegister = () => {
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
        <>
            <LoginNRegisterContainer isSignUp={isSignUp}>
                <SignUp
                    handleChange={handleChange}
                    register={register}
                    handleRegisterSubmit={handleRegisterSubmit}
                />
                <SignIn
                    handleLoginSubmit={handleLoginSubmit}
                    handleChange={handleChange}
                    register={register}
                    setIsSignUp={setIsSignUp}
                />
                <Overlay
                    setIsSignUp={setIsSignUp}
                />
            </LoginNRegisterContainer>
        </>
    );
};

export default NewLoginNRegister;
