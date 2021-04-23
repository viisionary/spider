import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link, useLocation} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

type CardItemType = {
    title: string, desc: string, id: string
}

interface Prop {
    items: CardItemType[]
}

const Cards: React.FC<Prop> = ({items}) => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    console.log('items', items)

    return (
        <Grid container spacing={2}>
            {items.map(({title, desc, id}) => {
                return <Grid key={id} item>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                be{bull}nev{bull}o{bull}lent
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" component={Link} to={`/items/${id}`} >Learn More</Button>
                        </CardActions>
                    </Card></Grid>
            })}
        </Grid>
    );
};
export default Cards;
