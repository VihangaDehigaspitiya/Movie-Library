import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import Movie from "./pages/Movie";
import {
    Route,
    Switch
} from 'react-router-dom';
import React from "react";

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <>
                    <div className="main-content">
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={LoginNRegister}/>
                        <Route path="/wish-list" component={WishList}/>
                        <Route path={`/movie/:id`} component={Movie}/>
                    </div>
                </>
            </Switch>
        </>
    );
}

export default App;
