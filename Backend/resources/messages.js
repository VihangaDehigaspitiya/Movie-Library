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

    SCC_USER_ADD_SUCCESS: 'User was successfully added',
    SCC_ALREADY_VERIFIED: 'User already verified',
    SCC_ACCOUNT_VERIFIED: 'Account was successfully verified',
    SCC_USER_LOGOUT: 'User was successfully logged out',

    ERR_INTERNAL_SERVER: 'Internal Server Error',
});

module.exports = messages;
