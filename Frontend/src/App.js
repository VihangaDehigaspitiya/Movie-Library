import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import Movie from "./pages/Movie";
import movie from "./services/movie.api";
import {
    Route,
    Switch
} from 'react-router-dom';
import React, {useEffect} from "react";

function App() {
    useEffect(() => {
        movie.setImageConfiguration();
    },[])

    return (
        <>
            <Header/>
            <Switch>
                <>
                    <div className="main-content">
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" exact component={LoginNRegister}/>
                        <Route path="/wish-list" exact component={WishList}/>
                        <Route path={`/movie/:id`} exact component={Movie}/>
                    </div>
                </>
            </Switch>
        </>
    );
}

export default App;
