import React, { useEffect } from 'react';
import { Interpreter } from 'xstate';
import {
    AuthMachineContext,
    AuthMachineEvents,
} from '../../machines/authMachine';
import { conferenceFields } from '../../constant/conferenceForm';
import { getLocation } from '../../utils/locationUtils';
import {makeStyles} from "@mui/styles";
import {theme} from "../../theme";
import { useActor } from '@xstate/react';
import {Avatar, Backdrop, Button, Paper} from "@mui/material";
import PresetForm from "spider-vision/Form/PresetForm";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/19
 Time: 12:35 下午

 描述：
 **/

interface Props {
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const useStyles = makeStyles(() =>
    ({
        ProfileContainer: {
            flexGrow: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '93vh',
            padding: '20px',
            [theme.breakpoints.up('sm')]: {
                height: '89vh',
            },
        },
        avatar: {
            padding: '10px',
        },
        frontCover: {},
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    })
);

const ProfileContainer: React.FC<Props> = ({ authService }) => {
    const [open, setOpen] = React.useState(false);
    const [currentLocation, setCurrentLocation] = React.useState('');

    const [authState, sendAuth] = useActor(authService);

    const handleToggleProfileEditor = () => {
        setOpen(true);
    };
    const handleCloseProfileEditor = () => {
        setOpen(false);
    };
    useEffect(() => {
        (async function () {
            if (!authState.context?.user?.location) {
                const location = await getLocation();
                // TODO send and mem
                location && setCurrentLocation(location);
            }
        })();
    }, []);
    useEffect(() => {
        document.title =
            `${authState.context?.user?.firstName}（${authState.context?.user?.username}）` ||
            'SPIDER';
    }, [authState]);
    const classes = useStyles();

    const handleLogOut = () => {
        sendAuth('LOGOUT');
    };

    const handleEdit = async () => {};
    return (
        <Paper className={classes.ProfileContainer}>
            <p className={classes.frontCover}>
                <Avatar
                    className={classes.avatar}
                    alt="Remy Sharp"
                    src={authState.context?.user?.avatar}
                />
                <span>Hi! {authState.context?.user?.firstName}</span>
                <Button variant="outlined" onClick={handleToggleProfileEditor}>
                    编辑个人资料
                </Button>
                <div>
                    {authState.context?.user?.location || currentLocation}
                </div>
            </p>
            <div>
                <Button variant="outlined" onClick={handleLogOut}>
                    退出登录
                </Button>
            </div>
            <Backdrop
                className={classes.backdrop}
                open={open}
                onClick={handleCloseProfileEditor}
            >
                <PresetForm
                    fields={conferenceFields}
                    validate={() => {}}
                    initialValues={{}}
                    submitPending={handleEdit}
                    submitText="submit"
                    validationSchema={{}}
                />
            </Backdrop>
        </Paper>
    );
};
export default ProfileContainer;
