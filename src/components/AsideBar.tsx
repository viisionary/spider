import React, {forwardRef, ForwardRefRenderFunction, useImperativeHandle, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Box, Button, Collapse, Drawer, Hidden, ListItemButton, ListItemText, SvgIcon, Typography} from "@mui/material";
import {useActor} from "@xstate/react";
import {Link,} from "react-router-dom";
// import { DrawerService } from "../machines";
// import { MenuWithChild } from "../constant/menuRoute";
import {makeStyles} from "@mui/styles";
import isEmpty from "lodash/isEmpty";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import LogoIcon from "../logo.svg";
import {theme} from "../theme";
import {BaseModalMachineContext, BaseModalMachineSchema} from "spider-vision/BaseDialogModal/baseModalMachine";
import {Interpreter} from "xstate";
import {useLocation} from "react-router";

export interface DrawerService {
    drawerService: Interpreter<BaseModalMachineContext, BaseModalMachineSchema, any>;
}

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    drawer: {},
    toolbar: {
        textAlign: "center",
        lineHeight: "64px"
    },
    drawerPaper: {
        width: drawerWidth,
        maxWidth: drawerWidth
    },
    content: {
        flexGrow: 1
        // padding: theme.spacing(3),
    },
    item: {
        borderLeft: "3px solid pink"
    },
    selected: {
        // borderColor: theme.palette.error.light,
    },
    logoButton: {
        margin: theme.spacing(4, 7),
        justifyContent: "flex-start"
    }
}));

export interface AsideBarHandles {
    handleDrawerToggle(): void;
}

interface AsideBarProps extends DrawerService {
    config: any[];
}

export type AiderBarType = ForwardRefRenderFunction<AsideBarHandles, AsideBarProps>;
const AsideBar: AiderBarType = ({config, drawerService}, ref) => {
    const classes = useStyles();
    // const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [Opens, setOpens] = useState<string[]>(["media"]);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    useImperativeHandle(ref, () => ({
        handleDrawerToggle
    }));

    const [drawerState] = useActor(drawerService);

    const permanentDrawer = drawerState?.matches("visible");


    let {pathname} = useLocation();

    // useMatch();

    const handleToggle = (route: string) => {
        if (Opens.includes(route)) {
            const opens = Opens.filter(item => item !== route);
            setOpens(opens);
            return;
        }
        setOpens(pre => [...pre, route]);
    };
    const drawer = (
        <div>
            <List>
                {config.map((page: any) => {
                    if (!isEmpty(page.child)) {
                        return <Box key={page.name + page.pathFormat}>
                            <ListItemButton onClick={() => handleToggle(page.name)}>
                                <ListItemIcon sx={{width: 16, paddingX: 4, paddingTop: "6px", margin: 0}}>
                                    <SvgIcon
                                        color={pathname.includes(page.pathFormat) ? "primary" : "secondary"}
                                    >
                                        {page.icon}
                                    </SvgIcon>
                                </ListItemIcon>
                                <ListItemText>
                                    {page.title}
                                </ListItemText>
                                {Opens.includes(page.name) ? <ExpandLess/> : <ExpandMore/>}
                            </ListItemButton>
                            <Collapse in={Opens.includes(page.name)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {page.child.map(({icon, title, path, pathFormat, name}: any) => {
                                        return <ListItemButton sx={{pl: 4}}
                                                               component={Link}
                                                               key={name + pathFormat}
                                                               selected={(pathname.includes(pathFormat) || pathFormat.includes(pathname)) && pathname !== "/"}
                                                               to={path}>
                                            <ListItemIcon sx={{width: 16, paddingX: 4, paddingTop: "6px", margin: 0}}>
                                            </ListItemIcon>
                                            <ListItemText>
                                                {title}
                                            </ListItemText>
                                        </ListItemButton>;
                                    })}
                                </List>
                            </Collapse>
                        </Box>;
                    }
                    return (
                        <ListItem
                            button
                            component={Link}
                            key={page.name}
                            to={page.path}
                            selected={pathname.includes(page.pathFormat)}
                        >
                            <ListItemIcon sx={{width: 16, paddingX: 4, paddingTop: "6px", margin: 0}}>
                                <SvgIcon
                                    color={pathname.includes(page.pathFormat) ? "primary" : "secondary"}
                                >
                                    {page.icon}
                                </SvgIcon>
                            </ListItemIcon>
                            <ListItemText>
                                {page.title}
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
    return (
        <Box className={permanentDrawer ? classes.drawer : undefined} style={{
            zIndex: 1, boxShadow: "0px 2px 8px 0px #EEEEEE"
        }}>

            {
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: drawerWidth,
                                boxSizing: "border-box",
                                border: "none"
                            }
                        }}
                        ModalProps={{
                            keepMounted: true
                            // Better open performance on mobile.
                        }}
                    >
                        <Button
                            component={Link}
                            to="/"
                            sx={{marginY: 4, justifyContent: "flex-start", marginX: 5}}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <LogoIcon/>
                            <Typography marginX={3}>
                                内容管理平台
                            </Typography>
                        </Button>
                        {drawer}
                    </Drawer>
                </Hidden>
            }
            {permanentDrawer && (
                <Hidden mdDown implementation="css">
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: {
                                width: drawerWidth,
                                boxSizing: "border-box",
                                border: "none"
                            }
                        }}
                        variant="permanent"
                    >
                        <Button
                            component={Link}
                            to="/"
                            sx={{marginY: 4, justifyContent: "flex-start", marginX: 5}}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <LogoIcon/>
                            <Typography marginX={3}>
                                内容管理平台
                            </Typography>
                        </Button>
                        {drawer}
                    </Drawer>
                </Hidden>
            )}
        </Box>
    );
};

export default forwardRef(AsideBar);
