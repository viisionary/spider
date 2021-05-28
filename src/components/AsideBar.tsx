import React, {forwardRef, useImperativeHandle} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {Divider, Drawer, Hidden, useTheme} from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
                background: 'red'
            },
        },
        menuButton: {
            position: 'absolute',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: {
            ...theme.mixins.toolbar,
            textAlign: 'center',
            lineHeight:'64px',
        },
        drawerPaper: {
            width: drawerWidth,
            [theme.breakpoints.up('md')]: {
                top: 64,
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);


function AsideBar({config}: any, ref: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useImperativeHandle(ref, () => ({
        handleDrawerToggle
    }));

    const drawer = (
        <div>
            <h6 className={classes.toolbar}>
                SPIDER v1.0.0
            </h6>
            <Divider />
            <List>
                {config.map((page: any) => (
                    <ListItem button component="a" key={page.name} href={page.path}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText primary={page.title} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <div className={classes.drawer}>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    classes={{paper: classes.drawerPaper}}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
}

export default forwardRef(AsideBar)
