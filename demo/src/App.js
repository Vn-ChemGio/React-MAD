import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import jsonServerProvider from 'ra-data-json-server';


import './App.css';

import authProvider from './authProvider';
import themeReducer from './themeReducer';

import { Dashboard } from './pages/dashboard';
import Login  from './pages/Login';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import UserList from './users'

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';




const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
}, 'en');

const App = () => {
    let [dataProvider, setDataProvider] = useState(null);
    dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
    // useEffect(() => {
    //     let restoreFetch;
    //
    //     const fetchDataProvider = async () => {
    //         restoreFetch = await fakeServerFactory(
    //             process.env.REACT_APP_DATA_PROVIDER
    //         );
    //
    //         setDataProvider(
    //             await dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER)
    //         );
    //     };
    //
    //     fetchDataProvider();
    //
    //     return restoreFetch;
    // }, []);

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

            i18nProvider={i18nProvider}
        >
            <Resource name="posts" list={UserList} />
        </Admin>
    );
};

export default App;