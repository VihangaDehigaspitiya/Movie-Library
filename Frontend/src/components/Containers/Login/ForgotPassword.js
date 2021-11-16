import React, {useState} from 'react';
import {Modal, Form} from "react-bootstrap";
import MainButton from "../../UI/MainButton/MainButton";
import API from "../../../services";
import {toast} from "react-toastify";

const ForgotPassword = ({forgotPassword, setForgotPassword}) => {

    const [openOtpModal, setOpenOtpModal] = useState(false);
    const [openNewPasswordModal, setOpenNewPasswordModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
        email: '',
        newPassword: '',
        newConfirmPassword: '',
        otp: ''
    });

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await API.user.forgotPassword(forgotPasswordDetails.email)
            .then((res) => {
                console.log(res);
                setLoading(false)
                toast.success(res.data.message);
                setUserId(res.data.value)
                setForgotPassword(false);
                setOpenOtpModal(true);
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response ? err.response.data.message : 'Something went wrong')
                console.log(err)
            })

    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await API.user.verifyOTP(forgotPasswordDetails.otp, userId)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                setOpenOtpModal(false);
                setOpenNewPasswordModal(true);
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response ? err.response.data.message : 'Something went wrong')
                console.log(err)
            })
    };

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        await API.user.resetPassword({
            password: forgotPasswordDetails.newPassword,
            otp: forgotPasswordDetails.otp
        }, userId)
            .then((res) => {
                setLoading(false)
                toast.success(res.data.message)
                setOpenNewPasswordModal(false);
            })
            .catch((err) => {
                setLoading(false)
                toast.error(err.response ? err.response.data.message : 'Something went wrong')
                console.log(err)
            })
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        const payload = {...forgotPasswordDetails};
        payload[name] = value;
        setForgotPasswordDetails(payload);
    };

    return (
        <div>
            <Modal show={forgotPassword} onHide={() => setForgotPassword(false)}>
                <Form onSubmit={handleEmailSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please enter your email address to get the verification OTP.</p>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={forgotPasswordDetails.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <MainButton
                            type="button"
                            variant="secondary"
                            handleClick={() => setForgotPassword(false)}>
                            Close
                        </MainButton>
                        <MainButton
                            spinnerClass="md"
                            isLoading={isLoading}>
                            Submit
                        </MainButton>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={openOtpModal} onHide={() => setOpenOtpModal(false)}>
                <Form onSubmit={handleOtpSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forgot Password?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Please enter the OTP sent to your email address.</p>

                        <Form.Group className="w-100">
                            <Form.Control
                                type="number"
                                placeholder="OTP"
                                name="otp"
                                value={forgotPasswordDetails.otp}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <MainButton
                            type="button"
                            variant="secondary"
                            handleClick={() => setOpenOtpModal(false)}>
                            Close
                        </MainButton>
                        <MainButton
                            spinnerClass="md"
                            isLoading={isLoading}>
                            Submit
                        </MainButton>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Modal show={openNewPasswordModal} onHide={() => setOpenNewPasswordModal(false)}>
                <Form onSubmit={handleNewPasswordSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="w-100">
                            <Form.Control
                                className="mb-2"
                                type="password"
                                placeholder="Password"
                                name="newPassword"
                                value={forgotPasswordDetails.newPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="w-100">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="newConfirmPassword"
                                value={forgotPasswordDetails.newConfirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <MainButton
                            type="button"
                            variant="secondary"
                            handleClick={() => setOpenNewPasswordModal(false)}>
                            Close
                        </MainButton>
                        <MainButton
                            spinnerClass="md"
                            isLoading={isLoading}>
                            Submit
                        </MainButton>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ForgotPassword;
