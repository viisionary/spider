import React, { useEffect } from 'react';
import {makeStyles} from "@mui/styles";
import {Card, CardActions, CardMedia, IconButton, Typography} from "@mui/material";


/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/6/3
 Time: 3:23 PM

 描述：
 **/

interface Props {
    cover: string;
    title: string;
    path: string;
    className: string;
}

const useStyles = makeStyles(() =>
    ({
        ArticleCard: {},
        icon: {},
    })
);
const ArticleCard: React.FC<Props> = ({ cover, title, path, className }) => {
    const classes = useStyles();

    return (
        <Card
            key={Math.random()}
            className={classes.ArticleCard + ' ' + className}
        >
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={cover}
                title={title}
            />
            <CardActions>
                <Typography variant="body2" color="textSecondary" component="p">
                    {title}
                </Typography>
                <IconButton
                    component={'a'}
                    href={path}
                    aria-label={`info about ${title}`}
                    className={classes.icon}
                >
                    info
                    {/*<InfoIcon />*/}
                </IconButton>
            </CardActions>
        </Card>
    );
};
export default ArticleCard;
