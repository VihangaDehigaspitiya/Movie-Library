const messages = Object.assign({
    /**
     * Add all the info and error messages here
     */

    // User
    ERR_USER_ALREADY_EXISTS: 'User already exists',
    ERR_USER_DOES_NOT_EXIST: 'User not found',
    ERR_USER_ID_NOT_FOUND: 'User id not found',
    ERR_UNAUTHORIZED: 'Unauthorized Access',
    ERR_MISSING_TOKEN: 'Token is missing',
    ERR_TOKEN_EXPIRED: 'Token Expired',
    ERR_USER_NOT_VERIFIED: 'Please verify email first!',
    ERR_PASSWORD_INCORRECT: "Incorrect Password",
    ERR_OTP_WRONG: 'Wrong OTP',

    SCC_USER_ADD_SUCCESS: 'User was successfully added. Please check your email.',
    SCC_ALREADY_VERIFIED: 'User already verified',
    SCC_ACCOUNT_VERIFIED: 'Account was successfully verified',
    SCC_USER_LOGOUT: 'User was successfully logged out',
    SCC_OTP_EMAIL: 'OTP was successfully sent to your email',
    SCC_PASSWORD_RESET: 'Password was reset successfully',

    // Wishlist
    SCC_WISHLIST_ADD_SUCCESS: 'Movie was successfully updated',
    SCC_WISHLIST_REMOVE_SUCCESS: 'Movie was removed successfully from the wishlist',

    ERR_EMAIL_SENT: 'Something went wrong when sending the email',
    ERR_RENDERING_TEMPLATE: 'Something went wrong when rendering the email template',
    SCC_EMAIL_SUCCESSFULLY_SENT: 'Email was successfully sent',

    ERR_INTERNAL_SERVER: 'Internal Server Error',
});

module.exports = messages;
