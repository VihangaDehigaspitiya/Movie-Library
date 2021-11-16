import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import ProtectedRoute from "./components/Containers/Common/ProtectedRoute";
import Movie from "./pages/Movie";
import movie from "./services/movie.api";
import {
    Switch,
    useLocation
} from 'react-router-dom';
import React, {useEffect} from "react";

const isAuthenticated = !!localStorage.getItem("user");

function App() {
    const location = useLocation();

    useEffect(() => {
        movie.setImageConfiguration();
    },[])

    return (
        <>
            <Header/>
            <Switch location={location} key={location.pathname}>
                <>
                    <div className="main-content">
                        <ProtectedRoute
                            auth={!isAuthenticated}
                            redirect="/"
                            path="/"
                            exact
                            component={Home}
                        />

                        <ProtectedRoute
                            auth={!isAuthenticated}
                            redirect="/"
                            path="/login"
                            exact
                            component={LoginNRegister}
                        />

                        <ProtectedRoute
                            auth={!isAuthenticated}
                            redirect="/"
                            path="/movie/:id"
                            exact
                            component={Movie}
                        />

                        <ProtectedRoute
                            auth={isAuthenticated}
                            redirect="/login"
                            path="/wish-list"
                            exact
                            component={WishList}
                        />
                        {/*<Route path="/" exact component={Home}/>*/}
                        {/*<Route path="/login" exact component={LoginNRegister}/>*/}
                        {/*<Route path="/wish-list" exact component={WishList}/>*/}
                        {/*<Route path={`/movie/:id`} exact component={Movie}/>*/}
                    </div>
                </>
            </Switch>
        </>
    );
}

export default App;
