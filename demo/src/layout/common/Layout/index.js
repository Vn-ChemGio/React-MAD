import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from '../AppBar';
import Menu from '../../Menu';
import { darkTheme, lightTheme } from '../../themes';

const CustomSidebar = props => <Sidebar {...props}/>;

const CustomMenu = props => <Menu {...props} dense={false} />;
export default props => {
    const theme = useSelector(state =>
        state.theme === 'dark' ? darkTheme : lightTheme
    );

    return (
        <Layout
            {...props}
            appBar={AppBar}
            sidebar={CustomSidebar}
            menu={CustomMenu}
            theme={theme}
            className={theme.root}

        />

    );
};
