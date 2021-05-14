import React, {useEffect} from "react"
import {Button} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/8
 Time: 7:24 下午

 描述：
 **/

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Home: {
            background: 'yellow',
            [theme.breakpoints.down('md')]: {
                background: 'pink'
            },
        },

    }),
);
const Home: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {
    }, []);
    const classes = useStyles();

    return <div className={classes.Home}>
        <h1>
            Home
        </h1>
        <Button variant="contained" onClick={handleToggle}>{open.toString()}</Button>
    </div>
}
export default Home
