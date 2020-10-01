import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from '../MainPage';
import '../main.css';

// console.log({MainPage})

export default () => {
    let basename=undefined
    const base=document.querySelector('base')
    if (base) {
        basename=base.getAttribute('href')
    }
    return <Router basename={basename}>
        <Switch>
            <Route exact path='/' component={MainPage} />
        </Switch>
    </Router>
}
