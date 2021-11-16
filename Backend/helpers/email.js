const path = require("path");
const fs = require('fs');
const ejs = require("ejs");
const dotenv = require("dotenv");
const sgMail = require('@sendgrid/mail');
const MessageCode = require('../resources/messages');
const OperationResult = require('../helpers/result');

dotenv.config();

// SendGrid Configuration
sgMail.setApiKey(process.env.SENDGRID_SECRET_KEY);

/**
 * Send account confirmation email
 * @param template
 * @param subject
 * @param userDetails
 * @param additionalData
 * @returns {Promise<T|{status: boolean, additionalInformation: *, message: *, value: null}|{status: boolean, additionalInformation: null, message: *, value: null}>}
 */
const confirmationEmail = async (template, subject, userDetails, additionalData = null) => {
    return await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
            // data which are appear in the email
            name: userDetails.first_name,
            subject: subject,
        },
        {async: true})

        .then(async (renderedTemplate) => {
            return await sendEmail({
                to: userDetails.email,
                from: {
                    email: 'rashmikarc@gmail.com',
                    name: 'IMDB Hub'
                },
                subject: subject,
                html: renderedTemplate
            }).then((result) => OperationResult.success(userDetails.id, result))
        })
        .catch(err => OperationResult.failed(MessageCode.ERR_RENDERING_TEMPLATE, err.toString()))
};

/**
 * Send account verification email
 * @param template
 * @param subject
 * @param userDetails
 * @param verificationLink
 * @param additionalData
 * @returns {Promise<T|{status: boolean, additionalInformation: *, message: *, value: null}|{status: boolean, additionalInformation: null, message: *, value: null}>}
 */
const verificationEmail = async (template, subject, userDetails, verificationLink, additionalData = null) => {
    return await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
            // data which are appear in the email
            name: userDetails.first_name,
            subject: subject,
            verificationLink: verificationLink.toString()
        },
        {async: true})

        .then(async (renderedTemplate) => {
            return await sendEmail({
                to: userDetails.email,
                from: {
                    email: 'rashmikarc@gmail.com',
                    name: 'IMDB Hub'
                },
                subject: subject,
                html: renderedTemplate
            }).then((result) => OperationResult.success(userDetails.id, result))
        })
        .catch(err => OperationResult.failed(MessageCode.ERR_RENDERING_TEMPLATE, err.toString()))
};

/**
 * Forgot password email
 * @param template
 * @param subject
 * @param userDetails
 * @param additionalData
 * @returns {Promise<T|{status: boolean, additionalInformation: *, message: *, value: null}|{status: boolean, additionalInformation: null, message: *, value: null}>}
 */
const forgotPasswordEmail = async (template, subject, userDetails, additionalData = null) => {
    return await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
            // data which are appear in the email
            name: userDetails.first_name,
            subject: subject,
            otp: userDetails.reset_otp.toString()
        },
        {async: true})

        .then(async (renderedTemplate) => {
            return await sendEmail({
                to: userDetails.email,
                from: {
                    email: 'rashmikarc@gmail.com',
                    name: 'IMDB Hub'
                },
                subject: subject,
                html: renderedTemplate
            }).then((result) => OperationResult.success(userDetails.id, result))
        })
        .catch(err => OperationResult.failed(MessageCode.ERR_RENDERING_TEMPLATE, err.toString()))
};

/**
 * Password reset confirmation email
 * @param template
 * @param subject
 * @param userDetails
 * @param additionalData
 * @returns {Promise<T|{status: boolean, additionalInformation: *, message: *, value: null}|{status: boolean, additionalInformation: null, message: *, value: null}>}
 */
const passwordResetConfirmationEmail = async (template, subject, userDetails, additionalData = null) => {
    return await ejs.renderFile(path.join(__dirname, `../templates/${template}.ejs`), {
            // data which are appear in the email
            name: userDetails.first_name,
            subject: subject
        },
        {async: true})

        .then(async (renderedTemplate) => {
            return await sendEmail({
                to: userDetails.email,
                from: {
                    email: 'rashmikarc@gmail.com',
                    name: 'IMDB Hub'
                },
                subject: subject,
                html: renderedTemplate
            }).then((result) => OperationResult.success(userDetails.id, result))
        })
        .catch(err => OperationResult.failed(MessageCode.ERR_RENDERING_TEMPLATE, err.toString()))
};


const sendEmail = async (message) => {
    return await sgMail.send(message)
        .then(result => MessageCode.SCC_EMAIL_SUCCESSFULLY_SENT)
        .catch(err => OperationResult.failed(MessageCode.ERR_EMAIL_SENT, err.toString()));
};

const email = {
    confirmationEmail,
    verificationEmail,
    forgotPasswordEmail,
    passwordResetConfirmationEmail,
}

module.exports = email;
