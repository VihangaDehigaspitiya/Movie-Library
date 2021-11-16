import React, {useEffect, useState} from 'react';
import MainContainer from "../components/Containers/Common/MainContainer";
// import loadingGIF from "../assets/images/loading.gif"
import done from "../assets/images/done.png";
import failed from "../assets/images/failed.png";
import {Link, useParams} from "react-router-dom";
import API from "../services";

const UserVerification = () => {

    const {id} = useParams();

    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        API.user.verifyAccount(id)
            .then((res) => {
                setIsSuccess(true)
                console.log(res);
            })
            .catch((err) => {
                setIsSuccess(false)
                console.log(err)
            })
    }, [id]);

    // const loading = <img src={loadingGIF} alt="loading-img"/>;

    const success = (
        <div className="d-block text-center reg-done">
            <div>
                <img src={done} alt="done-img"/>
                <h4 className="reg-done__congrats">Account Verification Successful!</h4>
                <h5 className="reg-done__sub-title">
                    You have successfully verified your email address.
                </h5>
                <div className="select-user-modal__button">
                    <Link className="main-button" to="/">Home</Link>
                </div>
            </div>
        </div>
    );

    const failure = (
        <div className="d-block text-center reg-done">
            <div>
                <img src={failed} alt="done-img"/>
                <h4 className="reg-done__congrats">We are Sorry!!</h4>
                <h5 className="reg-done__sub-title">
                    We can't find you in our database! You can register by clicking the button below!
                </h5>
                <div className="select-user-modal__button">
                    <Link className="main-button" to="/">Home</Link>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <MainContainer>
                <div className="account-verification-page">
                    {isSuccess ? success : failure}
                </div>
            </MainContainer>
        </div>
    );

}
export default UserVerification;
