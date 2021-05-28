import React, {useEffect, useRef} from "react"
import {IconButton} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {flexColumnStretch, flexRow, flexRowBetween, fontFamily} from "../../styles";
import signinLogo from '../../svg/signin.svg'
import {Link} from "react-router-dom";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 7:39 下午

 描述：
 **/

interface Props {
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        Home: {
            ...flexColumnStretch,
            background: 'white',
            [theme.breakpoints.down('md')]: {},

        },
        header: {
            ...flexRow,
            flex: 0,

            background: 'black',
            gap: '1.5rem',
            padding: '1rem 2rem',
            fontWeight: 400,
        },
        headerAfter: {
            backgroundImage: 'linear-gradient(90deg,pink 0,yellow 50%,blue)',
            height: '4px',
        },
        main: {
            padding: '5rem 5vw',
            background: theme.palette.primary.main,
            minHeight: '398px',
            fontFamily
        },
        bio: {
            padding: '5rem 5vw',
            borderTop: '1px solid #d4d0e0',
            borderBottom: '1px solid #d4d0e0',
            margin: 0
        },
        sharesStories: {},
        sharesStoriesH1: {
            textAlign: 'center',
            color: '#78757f'
        },
        footer: {
            ...flexRowBetween,
            padding: '2rem',
            fontSize: '.875rem',
            color: '#78757f',
        },
        hello: {
            padding: '5rem 5vw',
            background: theme.palette.secondary.main,
            borderTop: '1px solid #d4d0e0',
            borderBottom: '1px solid #d4d0e0'
        },
        signin: {
            position: 'fixed',
            right: 20,
            top: -50,
            transition: 'top .2s ease-out;',
            '&:hover': {
                top: 0,
                // backgroundColor: green[600],
            },
        }
    }),
);
const Home: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    const main = useRef<any>();

    useEffect(() => {
        const ctx = main.current.getContext("2d");
        console.log(ctx)
        // main.current = document.getElementById("main");
        // ctx && ctx.fillText(`visionary`,0 ,0);
        ctx.font = "20px " + fontFamily;
        ctx.fillText("Hello World!", 10, 50);

        ctx.font = "60px" + fontFamily;
        const gradient = ctx.createLinearGradient(0, 0, main.current.width, 0);
        gradient.addColorStop(Number("0"), "pink");
        gradient.addColorStop(Number("0.5"), "yellow");
        gradient.addColorStop(Number("1.0"), "blue");
        ctx.fillStyle = gradient;
        ctx.fillText("visionary".toLocaleUpperCase(), 10, 90);
    }, []);
    const classes = useStyles();

    return <div className={classes.Home}>
        <header className={classes.header}>
            Visionary's Page
            <IconButton aria-label="delete" component={Link} to={'/signin'} className={classes.signin} size="small">
                <img src={signinLogo} alt="" />
            </IconButton>
        </header>
        <div className={classes.headerAfter} />
        <section className={classes.main}>
            <canvas ref={main} />
        </section>
        <p className={classes.bio}>
            bio
        </p>
        <div className={classes.sharesStories}>
            <h1 className={classes.sharesStoriesH1}>shares stories about code (and not-code).</h1>
        </div>
        <div className={classes.hello}></div>
        <footer className={classes.footer}>
            <span>powered by boops</span>
            <Link rel="stylesheet" to="https://github.com/vislonery">source code</Link>
        </footer>
    </div>
}
export default Home
