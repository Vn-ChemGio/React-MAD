import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import authProvider from './authProvider';
import { Login, Layout } from './layout';
import { Dashboard } from './dashboard';


import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';
import visitors from "../src/visitors";



class App extends Component {
    state = { dataProvider: null };

    async componentWillMount() {
        this.restoreFetch = await fakeServerFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        const dataProvider = await dataProviderFactory(
            process.env.REACT_APP_DATA_PROVIDER
        );

        this.setState({ dataProvider });
    }

    componentWillUnmount() {
        this.restoreFetch();
    }

    render() {
        const { dataProvider } = this.state;

        if (!dataProvider) {
            return (
                <div className="loader-container">
                    <div className="loader">Loading...</div>
                </div>
            );
        }

        return (

            <Admin
                title=""
                dataProvider={dataProvider}
                authProvider={authProvider}
                dashboard={Dashboard}
                loginPage={Login}
            >

                <Resource name="customers" {...visitors} />
            </Admin>
        );
    }
}

export default App;
