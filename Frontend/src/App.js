import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import {
    Route,
    Switch
} from 'react-router-dom';

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
                   </div>
               </>
            </Switch>
        </>
    );
}

export default App;
