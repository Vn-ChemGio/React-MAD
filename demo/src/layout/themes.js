import { makeStyles } from '@material-ui/core/styles';


export const darkTheme = {
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
};

export const lightTheme = makeStyles(theme => ( {
    palette: {
        secondary: {
            light: '#5f5fc4',
            main: '#283593',
            dark: '#001064',
            contrastText: '#fff',
        },
    },
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0,nc 0.04)',
                },
            },
        },
    },

    toolbar: {
        minHeight: 128,
        alignItems: 'flex-start',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(7),
        marginTop:theme.spacing(8)
    },

}));
