import React, { useEffect } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardMedia,
    Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
                    <InfoIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};
export default ArticleCard;
