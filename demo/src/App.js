import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';

import './App.css';

import { LayoutProvider } from "./contexts/LayoutContext";




import authProvider from './authProvider';
import sagas from './sagas';
import themeReducer from './themeReducer';
import { Layout } from './layout';
import Login from './pages/login/Login-old';
import { Dashboard } from './dashboard';
import customRoutes from './routes';
import englishMessages from './i18n/en';

import visitors from './visitors';
import orders from './orders';
import products from './products';
import invoices from './invoices';
import categories from './categories';
import reviews from './reviews';

import dataProviderFactory from './dataProvider';
import fakeServerFactory from './fakeServer';
import Themes from "./themes";
import {ThemeProvider} from "@material-ui/styles";

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./i18n/fr').then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

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
            <LayoutProvider>
                <ThemeProvider theme={Themes.default}>
                <Admin
                    title=""
                    dataProvider={dataProvider}
                    customReducers={{ theme: themeReducer }}
                    customSagas={sagas}
                    customRoutes={customRoutes}
                    authProvider={authProvider}
                    dashboard={Dashboard}
                    loginPage={Login}
                    appLayout={Layout}
                    locale="en"
                    i18nProvider={i18nProvider}
                >
                    <Resource name="customers" {...visitors} />
                    <Resource
                        name="commands"
                        {...orders}
                        options={{ label: 'Orders' }}
                    />
                    <Resource name="invoices" {...invoices} />
                    <Resource name="products" {...products} />
                    <Resource name="categories" {...categories} />
                    <Resource name="reviews" {...reviews} />
                </Admin>
                </ThemeProvider>
            </LayoutProvider>
        );
    }
}

export default App;
