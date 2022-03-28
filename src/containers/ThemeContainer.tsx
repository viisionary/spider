import React from 'react';
import {
    themeColorService,
    themeProps,
} from '../machines/PreferThemeColorMachine';
import { useActor } from '@xstate/react';
import {makeStyles} from "@mui/styles";
import {Button, Paper} from '@mui/material';
import {theme} from "../theme";
//@ts-ignore
import {map} from "lodash";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 4:22 下午

 描述：
 **/

interface Props {}

const useStyles = makeStyles(() =>
    ({
        ThemeContainer: {
            // ...flexColumn,
            height: '80vh',
            [theme.breakpoints.down('md')]: {},
        },
        themesContainer: {
            // ...flexRow,
        },
        themeContent: {
            margin: '10px',
        },
    })
);

const ThemeContainer: React.FC<Props> = ({}, context) => {
    const [open, setOpen] = React.useState(true);
    // const context = useContext();
    console.log(context);

    const [themeColor, sendThemeColor] = useActor(themeColorService);

    const handleToggle = () => {
        // @ts-ignore
        sendThemeColor('CHANGE', { theme: 'theme2' });
    };

    // useEffect(() => {
    //     // themeColorService.start();
    // }, [themeColor]);
    const classes = useStyles();

    return (
        <Paper className={classes.ThemeContainer}>
            <h1>ThemeContainer</h1>
            <p>
                current color:
                {themeColor.context?.primary};{themeColor.context?.second}
            </p>
            <div className={classes.themesContainer}>
                {map(themeProps, ({ primary, second }:any, key:any) => (
                    <div className={classes.themeContent}>
                        {key}
                        <div style={{ backgroundColor: primary }}>11111</div>
                        <div style={{ backgroundColor: second }}>222222</div>
                        <Button
                            variant="outlined"
                            style={{ borderColor: primary }}
                            // @ts-ignore
                            onClick={() =>
                                sendThemeColor('CHANGE', { theme: key })
                            }
                        >
                            set theme
                        </Button>
                    </div>
                ))}
            </div>
        </Paper>
    );
};
export default ThemeContainer;
