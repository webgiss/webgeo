import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage';
import '../main.css';

// console.log({MainPage})

export default () => {
    return <Router>
        <Switch>
            <Route exact path='/' component={MainPage} />
        </Switch>
    </Router>
}
