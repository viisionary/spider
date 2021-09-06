import React, { useEffect } from 'react';
import { Avatar, Backdrop, Button, Paper } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Interpreter } from 'xstate';
import {
    AuthMachineContext,
    AuthMachineEvents,
} from '../../machines/authMachine';
import { useService } from '@xstate/react';
import PresetForm from '../../components/PresetForm';
import { conferenceFields } from '../../constant/conferenceForm';
import { getLocation } from '../../utils/locationUtils';

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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

    const [authState, sendAuth] = useService(authService);

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

    const handleEdit = () => {};
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
