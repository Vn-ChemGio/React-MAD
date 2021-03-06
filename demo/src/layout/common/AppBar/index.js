import React, {forwardRef} from 'react';
import {AppBar, UserMenu, MenuItemLink, useTranslate} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import SettingsIcon from '@material-ui/icons/Settings';

import Logo from '../../Logo';

import useStyles from './styles'

const ConfigurationMenu = forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItemLink
            ref={ref}
            to="/configuration"
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon/>}
            onClick={props.onClick}
        />
    );
});

const CustomUserMenu = props => (
    <UserMenu {...props}>
        <ConfigurationMenu/>
    </UserMenu>
);

const CustomAppBar = props => {
    const classes = useStyles();
    return (
        <AppBar {...props} userMenu={<CustomUserMenu/>} position="fixed" className={classes.appBar}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title} weight="medium"
                id="react-admin-title"
            />
            <Logo/>
            <span className={classes.spacer}/>
        </AppBar>


    );
};

export default CustomAppBar;
