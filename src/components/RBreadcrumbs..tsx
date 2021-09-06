import React, { useEffect } from 'react';
import { Breadcrumbs, Hidden, Link, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ARTICLE } from '../constant/Routes';

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 4:26 下午

 描述：
 **/

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadcrumbs: {},
        RBreadcrumbs: {},
    })
);
const RBreadcrumbs: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {}, []);
    const classes = useStyles();

    return (
        <div className={classes.RBreadcrumbs}>
            <Hidden mdUp>
                <Breadcrumbs
                    className={classes.breadcrumbs}
                    aria-label="breadcrumb"
                >
                    <Link color="inherit" href={ARTICLE}>
                        ARTICLE
                    </Link>
                    <Typography color="textPrimary">Socket</Typography>
                </Breadcrumbs>
            </Hidden>
            <Hidden smDown>
                <Typography color="textPrimary">Socket</Typography>
            </Hidden>
        </div>
    );
};
export default RBreadcrumbs;
