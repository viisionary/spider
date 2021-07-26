import React, {useEffect} from "react"
import {Button, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {flexColumn} from "../styles";
import {Link} from "react-router-dom";
import {useSfx} from "../hooks/useSfx";

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
            ...flexColumn,
            height: '90vh',
            [theme.breakpoints.down('md')]: {},
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

    return <Paper className={classes.Home}>
        <h1>
            SPIDER
        </h1>
        <p>
            A JavaScript library for building user interfaces
        </p>
        <ul>
            <li>有webRTC的例子，可连接</li>
            <li>表单 通过静态的配置可直接生成所需表单，包含....</li>
            <li>现成的分页</li>
            <li>spider-cli：下载spider-source</li>
            <li>spider-source：架子的源码</li>
            <li>spider:只放组见</li>
        </ul>

        <Button variant="outlined" to="/getting-started" component={Link}>Get Started</Button>

    </Paper>
}
export default Home
