import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme =>({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
    appBar:{
        height: theme.spacing(8),
        lineHeight:theme.spacing(8)
    }
}));
