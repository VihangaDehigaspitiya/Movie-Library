import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import ProtectedRoute from "./components/Containers/Common/ProtectedRoute";
import Movie from "./pages/Movie";
import UserVerification from "./pages/UserVerification";
import {
    Route,
    Switch,
} from 'react-router-dom';
import React, {useEffect} from "react";
import { ToastContainer } from 'react-toastify';
import TokenService from "./services/utilities/token";
import API from './services';
import {useHistory} from "react-router-dom";
import authStore from "./store/auth.store"

import 'react-toastify/dist/ReactToastify.css';



function App() {
    const history = useHistory();

    const user = authStore((state) => state.user)
    const isAuthenticated = authStore((state) => state.isAuthenticated)

    useEffect(() => {
        API.movie.setImageConfiguration();
    },[])

    console.log(isAuthenticated, "isAuthenticated")

    const logout = async () => {
        await API.user.logout()
            .then((res) => {
                authStore.setState({isAuthenticated: false, user: null})
                TokenService.removeUser()
                history.push(`/login`);
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <Header
                user={user}
                isAuthenticated={isAuthenticated}
                logout={logout}
            />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <Switch>
                <>
                    <div className="main-content">

                        <ProtectedRoute
                            auth={isAuthenticated}
                            redirect="/login"
                            path="/wish-list"
                            exact
                            component={WishList}
                        />
                        <Route path={'/user/verify/:id'} component={UserVerification}/>
                        <Route path="/login" exact component={LoginNRegister}/>
                        <Route path={`/movie/:id`} exact component={Movie}/>
                        <Route path={`/`} exact component={Home}/>
                    </div>
                </>
            </Switch>
        </>
    );
}

export default App;
