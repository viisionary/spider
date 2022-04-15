import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import {Link,} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {useActor} from "@xstate/react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {PROFILE,} from "../constant/Routes";
import LogoIcon from "../svg/logo.svg";
import {theme} from "../theme";
import DefaultAvatarIcon from "../svg/007-hacker.svg";
import {DrawerService} from "./AsideBar";
import {AuthService} from "../machines/authMachine";
import {useLocation} from "react-router";

const useStyles = makeStyles(
    () => ({
        appBarSpacer: {
            backgroundColor: "red",
            zIndex: 10
        },
        toolBar: {
            // backgroundColor: theme.palette.background.paper,
            backgroundImage: `linear-gradient(225deg, rgba(37, 96, 247, 0.3) 60%,#F2F6FC 70%)`,
            color: theme.palette.text.primary,
            minHeight: "54px"
        },
        grow: {
            flexGrow: 1
        },
        logoButton: {
            marginLeft: theme.spacing(2)
        },
        title: {
            display: "none"
            // [theme.breakpoints.up('sm')]: {
            //   display: 'block',
            // },
        },
        search: {
            position: "relative",
            // borderRadius: theme.shape.borderRadius,
            // backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                // backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            // marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%"
            // [theme.breakpoints.up('sm')]: {
            //   marginLeft: theme.spacing(3),
            //   width: 'auto',
            // },
        },
        searchIcon: {
            // padding: theme.spacing(0, 2),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        inputRoot: {
            color: "inherit"
        },
        inputInput: {
            // padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            // transition: theme.transitions.create('width'),
            width: "100%"
            // [theme.breakpoints.up('md')]: {
            //   width: '20ch',
            // },
        },
        sectionDesktop: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "flex"
            }
        },
        sectionMobile: {
            display: "flex",
            [theme.breakpoints.up("sm")]: {
                display: "none"
            }
        },
        menuButtonToggle: {
            backgroundColor: "pink",
            // [theme.breakpoints.up('md')]: {
            display: "none"
            //   backgroundColor: 'red',
            // },
        },
        root: {
            "&:hover": {
                // background:'transparent',
            }
        },
        userName: {
            display: "flex",
            alignItems: "center"
        }
    }),
    {name: "MuiButton"}
);

interface Props extends AuthService, DrawerService {
    onDrawerToggle: () => void;
}

const NavBar: React.FC<Props> = ({authService, onDrawerToggle, drawerService}: Props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [authState, sendAuth] = useActor(authService);
    const [drawerState] = useActor(drawerService);
    const permanentDrawer = drawerState?.matches("visible");
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const isLoggedIn = authState.matches("authorized");

    const userName = authState.context.user?.username;

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogOut = () => {
        sendAuth("LOGOUT");
        // handleClose(null);
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    // const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement | null>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        // eslint-disable-next-line
        // @ts-ignore
        // if (anchorRef.current && anchorRef.current?.contains(event.target)) {
        //   return;
        // }

        setOpen(false);
    };

    const handleListKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        }
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current && !open) {
            anchorRef.current?.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogOut}>logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: "top", horizontal: "right"}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Button
                component={Link}
                to={'items'}
                variant="text"
            >
                数据列表
            </Button>
            <MenuItem onClick={handleClose} component={Link} to={"/resetPwd"}>
                修改密码
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to={"/resetPwd"}>
                个人信息
            </MenuItem>
            <MenuItem onClick={handleLogOut} component={Link} to={"/resetPwd"}>
                退出登录
            </MenuItem>
        </Menu>
    );
    const {
        pathname
    } = useLocation();
    const showLog = pathname.includes("personal");
    return (
        <div className={classes.appBarSpacer}>
            <AppBar position="static" sx={{boxShadow: "none", background: theme.palette.background.default}}>
                <Toolbar className={classes.toolBar} color="info">

                    {isLoggedIn && (
                        <IconButton
                            color="info"
                            aria-label="open drawer"
                            sx={{mr: 2, display: {md: "none"}}}
                            className={permanentDrawer ? classes.menuButtonToggle : undefined}
                            onClick={onDrawerToggle}
                        >
                            <MenuIcon/>
                        </IconButton>
                    )}
                    {isLoggedIn &&
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
                    </Button>}
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        {isLoggedIn ? (
                            <>
                                {/* <Button
                  component={Link}
                  to={ITEMS}
                  color={pathname.includes("/conf") ? "primary" : "info"}
                  variant="text"
                >
                  数据列表
                </Button> */}
                                {/* <Typography variant="h6" className={classes.userName}>
                  {userName}
                </Typography> */}
                                <Button
                                    ref={anchorRef}
                                    aria-label="设置"
                                    aria-controls={open ? "menu-list-grow" : undefined}
                                    aria-haspopup="true"
                                    startIcon={<DefaultAvatarIcon/>}
                                    onClick={handleToggle}
                                    color={"info"}
                                    endIcon={<ArrowDropDownIcon/>}
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                >
                                    <Typography className={classes.userName}>{userName || "123****9999"}</Typography>
                                </Button>
                            </>
                        ) : (
                            <MenuItem
                                onClick={() => {
                                    // sendAuth("LOGINAGAIN")
                                }}
                            >
                                登录
                            </MenuItem>
                        )}
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="info"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === "bottom" ? "center top" : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose} component={Link} to={PROFILE}>
                                        个人信息
                                    </MenuItem>
                                    <MenuItem onClick={handleLogOut} sx={{justifyContent: 'center'}}>退出</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default NavBar;
