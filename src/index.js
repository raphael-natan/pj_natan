import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Login from './component/Login';

function verificaAutenticacao() {
    return localStorage.getItem('token') === null
}

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/" render={() => (
                    verificaAutenticacao() ? (
                        <Redirect to="/login" />
                    ) : (<App />)
                )} />
            </Switch>
        </Router>
    ),
    document.getElementById('root')
);