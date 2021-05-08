import React from 'react';
import {
    Box,
    Button,
    Card, CardActions, CardContent, CardMedia,
    Container,
    createStyles,
    Grid,
    GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader, Typography, useTheme
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import formExample from '../image/formExample.png'

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        homeContainer: {
            // padding:'0',
            // margin:'20px',

            // height:'2000px',
            // width:'2000px',
            display: 'flex',
            flexWrap: 'wrap',
            // flexGrow: 1,
            flexDirection: 'row',
            // spacing:2,
            justifyContent: 'flex-start',

            // backgroundColor: theme.palette.background.paper,
        },
        cardContainer: {
            // 适配电脑
            // width: 350,
            // background:'orange',
            margin: theme.spacing(1),
            // 适配 iPad/iPad 竖屏
            [theme.breakpoints.up("xs")]: {
                width: '100%',
                // background:'yellow'
            },
            // 适配 iPad/iPad 横屏
            [theme.breakpoints.up("sm")]: {
                width: '48%',
                margin: '1%',
                // background:'green'
            },
            // 适配 横屏iPad
            [theme.breakpoints.up("md")]: {
                width: '30%',
                margin: '1.5%',
                // background:'pink'
            },
            // 适配最大宽度 lg
            [theme.breakpoints.up("lg")]: {
                width: '22%',
                margin: '1.5%',
                // background:'red'
            },
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        gridList: {
            // width: 500,
        },
        icon: {
            color: 'rgba(214,9,9,0.54)',
        },
    }),
);
const tileData = [
    {img: formExample, title: '表单 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '分页列表 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '流式列表 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '详情 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '主题切换 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary', path: '/layout'},
    {img: formExample, title: '样式常量 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: 'PLog', author: 'visionary'},
    {img: formExample, title: 'Media EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
    {img: formExample, title: '布局 EXAMPLE & DOC', author: 'visionary'},
]
const HomeContainer: React.FC<Props> = () => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box className={classes.homeContainer}>
            {tileData.map((tile) => (
                <Card key={Math.random()} className={classes.cardContainer}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={tile.img}
                        title={tile.title}
                    />
                    <CardActions>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {tile.title}
                        </Typography>
                        <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                            <InfoIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            ))}
        </Box>
    )
}
export default HomeContainer;
