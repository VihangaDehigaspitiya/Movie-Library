import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/home";
import {
    BrowserRouter,
    Route,
    Switch
} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={LoginNRegister}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
