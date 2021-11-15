import LoginNRegister from "./pages/LoginNRegister";
import Home from "./pages/Home";
import WishList from "./pages/WishList";
import Header from "./components/UI/Header/Header";
import {Row, Col} from "react-bootstrap";
import {
    Route,
    Switch
} from 'react-router-dom';

function App() {
    return (
        <>
            <Header/>
            <Switch>
                <div className="main-content">
                    <Row className="mx-0">
                        <Col md={{span: 10, offset: 1}}>
                            <Route path="/" exact component={Home}/>
                            <Route path="/login" component={LoginNRegister}/>
                            <Route path="/wish-list" component={WishList}/>
                        </Col>
                    </Row>
                </div>

            </Switch>
        </>
    );
}

export default App;
