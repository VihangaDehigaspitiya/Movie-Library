const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.state?.user?.refreshToken;
}

const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.state?.user?.token;
}

const updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.state.user.token = token;
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

const removeUser = () => {
    localStorage.removeItem("user");
}

const token = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    removeUser
}

export default token;
