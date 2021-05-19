import React, {useEffect} from "react"
import {Button, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {flexColumn} from "../../styles";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 7:17 下午

 描述：
 **/

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        MessagesContainer: {
            ...flexColumn,
            [theme.breakpoints.down('md')]: {
            },
        },

    }),
);
const MessagesContainer: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {
    }, []);
    const classes = useStyles();

    return <Paper className={classes.MessagesContainer}>
        <h1>
            MessagesContainer
        </h1>
        <Button variant="contained" onClick={handleToggle}>{open.toString()}</Button>
    </Paper>
}
export default MessagesContainer
