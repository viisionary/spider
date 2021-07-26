import React, {useEffect, useRef, useState} from "react"
import {Box, Button, CardActions, IconButton, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {flexColumn, flexColumnStretch, flexRow, flexRowBetween, fontFamily} from "../../styles";
import signinLogo from '../../svg/signin.svg'
import {Link} from "react-router-dom";
import {ARTICLE} from "../../constant/Routes";
import {tileData} from "../ArticleContainer";
import InfoIcon from "@material-ui/icons/Info";
import ArticleCard from "../../components/ArticleCard.";
import {useSfx} from "../../hooks/useSfx";
import happyHand from '../../image/HappyHand.png'

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
            overflow: 'auto',
            [theme.breakpoints.down('md')]: {},

        },
        header: {
            ...flexRow,
            flex: 0,
            background: 'black',
            gap: '1.5rem',
            color: '#fff',
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
            fontFamily,
            ...flexColumn,
        },
        bio: {
            padding: '5rem 5vw',

            margin: 0
        },
        sharesStories: {
            borderTop: '1px solid #d4d0e0',
            borderBottom: '1px solid #d4d0e0',
        },
        sharesStoriesH1: {
            textAlign: 'center',
            color: '#78757f'
        },
        footer: {
            ...flexRowBetween,
            padding: '2rem',
            fontSize: '.875rem',
            color: '#78757f',
            background: '#fff'
        },
        hello: {
            padding: '5rem 5vw',
            background: theme.palette.secondary.main,
            borderTop: '1px solid #d4d0e0',
            borderBottom: '1px solid #d4d0e0'
        },
        visionary: {
            color: theme.palette.primary.main,
            background: 'black',
            fontSize: 100,
            padding: '0 30px 10px 30px',
            fontWeight: 800,
            margin: '0 auto'
        },
        frontEnd: {
            fontSize: 100,
            fontWeight: 800,
        },
        canvas: {
            position: 'absolute',
            // width: '100%',
        },
        cardContainer: {
            width: '30%',
            margin: '1.5%',
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
type Issue = {
    content: string,
    time: Date
}
type Issues = Issue[];
const Home: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    const main = useRef<any>();
    const {playAirhorn, playClick} = useSfx();

    useEffect(() => {
        const ctx = main.current.getContext("2d");
        console.log(ctx)
        // main.current = document.getElementById("main");
        // ctx && ctx.fillText(`visionary`,0 ,0);

        ctx.font = "20px " + fontFamily;
        ctx.fillText("Hello World!".toLocaleUpperCase(), 10, 50);


        const img = document.createElement('img')
        img.src = happyHand
        ctx.drawImage(img, 0, 0)

        ctx.font = "60px" + fontFamily;
        const gradient = ctx.createLinearGradient(0, 0, main.current.width, 0);
        gradient.addColorStop(Number("0"), "pink");
        gradient.addColorStop(Number("0.5"), "yellow");
        gradient.addColorStop(Number("1.0"), "blue");
        ctx.fillStyle = gradient;
    }, [main]);
    const classes = useStyles();
    const [issues, setIssues] = useState<Issues>([]);
    const [content, setContent] = useState<string>('');

    const handleComment = (e: any) => {
        e.preventDefault();
        playClick();
        const now = new Date();
        setIssues(prevArray => [...prevArray, {content, time: now}])
        setContent('')
    }
    return <div className={classes.Home}>
        <header className={classes.header}>
            Visionary's Page
            <IconButton aria-label="delete" component={Link} to={'/signin'} className={classes.signin} size="small">
                <img src={signinLogo} alt="" />
            </IconButton>
        </header>
        <div className={classes.headerAfter} />
        <section className={classes.main}>
            <canvas ref={main} className={classes.canvas} />
            <span className={classes.frontEnd}>frontEnd</span>
            <span className={classes.visionary}>visionary</span>
            <p className={classes.bio}>
                bio
            </p>
        </section>
        <div className={classes.sharesStories}>
            <h1 className={classes.sharesStoriesH1}>
                shares stories about code (and not-code).
                <Button component={Link} to={ARTICLE}>more</Button>
            </h1>
            <section>
                {tileData.map((tile) => (
                    tile.showIndex &&
										<ArticleCard className={classes.cardContainer} title={tile.title} cover={tile.img} path={tile.path}
										             key={tile.path} />
                ))}
            </section>
        </div>
        <div className={classes.hello}>
            <h1>issues</h1>
            {issues.map(({content, time}) => (<p key={time.getTime()}>{content}</p>))}
            <form noValidate autoComplete="on" onSubmit={handleComment}>
                <TextField value={content} onChange={(e) => setContent(e.target.value)} id="outlined-basic"
                           label="Outlined" variant="outlined" />
                <Button type="submit">xiu ~ </Button>
            </form>
        </div>
        <footer className={classes.footer}>
            <span>powered by ''</span>

            <Link rel="stylesheet" to="https://github.com/viisionary">source code</Link>
        </footer>
    </div>
}
export default Home
