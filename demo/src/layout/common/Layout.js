import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar/index';
import Menu from '../Menu';
import { darkTheme, lightTheme } from '../themes';

const CustomSidebar = props => <Sidebar {...props} size={200} />;

export default props => {
    const theme = useSelector(state =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );

    console.log(props)
    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={Menu}
            theme={theme}
        />
    );
};
