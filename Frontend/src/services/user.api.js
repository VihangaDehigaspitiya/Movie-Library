import BaseAPI from "./utilities/request.lib";
import TokenService from "./utilities/token";

/**
 * User login
 * @param email
 * @param password
 * @returns {Promise<AxiosResponse<any>|T>}
 */
const login = async (email, password) => {
    return await BaseAPI.post("/user/login", {
        email: email,
        password: password,
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error)
        return error.response ? error.response.data : {status: false, message: 'Something went wrong'};
    });
};

/**
 * User registration
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
const register = async (payload) => {
    return await BaseAPI.post("/user/register", {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        password: payload.password
    })
}

/**
 * Forgot password
 * @param email
 * @returns {Promise<AxiosResponse<any>>}
 */
const forgotPassword = async (email) => {
    return await BaseAPI.post("/user/forgot-password", {
        email: email
    })
}

/**
 * Verify OTP
 * @param otp
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const verifyOTP = async (otp, id) => {
    return await BaseAPI.post(`/user/verify/otp/${id}`, {
        otp: otp
    })
}

/**
 * Reset password
 * @param payload
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const resetPassword = async (payload, id) => {
    return await BaseAPI.post(`/user/reset-password/${id}`, {
        password: payload.password,
        otp: payload.otp
    })
}

/**
 * Verify user account
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
const verifyAccount = async (id) => {
    return await BaseAPI.get(`/user/verify/${id}`)
}

/**
 * Logout user
 * @returns {Promise<AxiosResponse<any>>}
 */
const logout = async () => {
    const refreshToken = TokenService.getLocalRefreshToken();
    return await BaseAPI.post(`/user/logout`, {
        refreshToken
    })
}

const user = {
    login,
    register,
    forgotPassword,
    verifyOTP,
    resetPassword,
    verifyAccount,
    logout
}

export default user;
