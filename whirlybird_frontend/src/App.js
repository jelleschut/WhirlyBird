import React from 'react';
import {useRoutes} from 'hookrouter'
import Routes from "./utils/router";
import './App.css';
import Header from './components/Header';

const App = () => {
    const routeResult = useRoutes(Routes);
    return (
        <div>
            <Header/>
            {routeResult}
        </div>
    );
};

export default App;
