import BaseAPI from "./utilities/request.lib";
import TokenService from "./utilities/token";

const login = async (email, password) => {
    return await BaseAPI.post("/user/login", {
        email: email,
        password: password,
    }).then((response) => {
        if (response.data.value) {
            TokenService.setUser(response.data.value)
        }
        return response.data
    }).catch((error) => {
        return error.response.data;
    });
    /*try {
        const response = await BaseAPI.post("/user/login", {
            email: email,
            password: password,
        });
        if (response.data.value) {
            TokenService.setUser(response.data.value)
        }

        return Promise.resolve({
            isAuthenticated: true,
            user: response.data.value
        });
    } catch (exception) {
        return Promise.reject({ isAuthenticated: false, errorObj:  exception});
    }*/
};

const register = async (payload) => {
    try {
        const response = await BaseAPI.post("/user/register", payload);
        return Promise.resolve(response.data.value);
    } catch (exception) {
        return Promise.reject(exception);
    }
}

const user = {
    login,
    register
}

export default user;
