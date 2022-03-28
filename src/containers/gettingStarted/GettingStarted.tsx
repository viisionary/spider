import React, {useEffect} from 'react';
import Button from "@mui/material/Button";
import {makeStyles,} from "@mui/styles";
import {theme} from "../../theme";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 7:35 下午

 描述：
 **/

interface Props {
}

const useStyles = makeStyles(() =>
    ({
        GettingStarted: {
            background: 'yellow',
            [theme.breakpoints.down('md')]: {
                background: 'pink',
            },
        },
    })
);
const GettingStarted: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {
    }, []);
    const classes = useStyles();

    return (
        <div className={classes.GettingStarted}>
            <h1>GettingStarted</h1>
            <Button variant="contained" onClick={handleToggle}>
                {open.toString()}
            </Button>
        </div>
    );
};
export default GettingStarted;
