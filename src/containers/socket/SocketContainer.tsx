import React, { useEffect, useRef } from 'react';

import { buildSocket, newVideo, removeVideo } from './fn';
//@ts-ignore
import Peer from 'peerjs';
import { ARTICLE } from '../../constant/Routes';
import ReactDOM from 'react-dom';
import { iceServers } from '../../constant/iceServers';
import { Interpreter } from 'xstate';
import {
    AuthMachineContext,
    AuthMachineEvents,
} from '../../machines/authMachine';
import { useActor } from '@xstate/react';
import {makeStyles} from "@mui/styles";
import {theme} from "../../theme";
import {Breadcrumbs, Button, Hidden, Link, List, ListItem, Paper, TextField, Typography, Box} from "@mui/material";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/10
 Time: 5:27 下午

 描述：
 **/

interface Props {
    authService: Interpreter<AuthMachineContext, any, AuthMachineEvents, any>;
}

const useStyles = makeStyles(() =>
    ({
        SocketContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            [theme.breakpoints.down('md')]: {},
        },
        SocketContent: {
            display: 'flex',
            flex: '1',
            justifyContent: 'space-between',
            flexDirection: 'column',
        },
        clientContainer: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            padding: '20px 30px',
            marginBottom: '20px',
        },
        breadcrumbs: {
            fontSize: '20px',
            padding: '10px 5px',
        },
    })
);
let i: number = 0;


const SocketContainer: React.FC<Props> = ({ authService }) => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [beforeUserVideos, setBeforeUserVideos] = React.useState<
        { GuestVideo: any; userId: string }[]
    >([]);

    const [userVideos, setUserVideos] = React.useState<
        { GuestVideo: any; userId: string }[]
    >([]);

    const [roomId, setRoomId] = React.useState<string>('123');
    const [message, setMessage] = React.useState('how r u');

    const [authStates] = useActor(authService);
    console.log(authStates);
    const id = authStates.context?.user?.id.replace('-', '');
    console.log(id);
    const [myUserId, setUserId] = React.useState(
        authStates.context?.user?.id.replaceAll('-', '') || ''
    );

    console.log(myUserId);
    const classes = useStyles();

    //useRef 返回的对象将在组件的整个生命周期内保持不变。
    const ws = useRef<any>(null);
    // const myUserId: string = Math.random() + ''

    const peer = useRef<any>(null);

    useEffect(() => {
        // @ts-ignore
        // const canvas:HTMLCanvasElement = document.querySelector('canvas');
        // const ctx:any = canvas.getContext('2d');
        // ctx.fillStyle = 'green';
        // ctx.fillRect(10, 10, 100, 100);
    });
    useEffect(() => {
        ws.current = buildSocket();
        ws.current.on('connect', () => {});
        ws.current.on('message', (e: string) => {
            setMessages((prevArray) => [...prevArray, e]);
        });

        return () => {
            ws.current.close();
        };
    }, []);
    /**
     * 这里没有deps，只执行一次；
     * 相当于did mount
     */
    useEffect(() => {}, [messages]);

    const handleMessageValueChange = ({ target: { value } }: any) => {
        setMessage(value);
    };
    const handleRoomIdChange = ({ target: { value } }: any) => {
        setRoomId(value);
    };

    const handleJoinIn = (): any => {
        if (!roomId) {
            return;
        }

        navigator.mediaDevices &&
            navigator.mediaDevices
                .getUserMedia({
                    video: true,
                    audio: true,
                })
                .then((stream: MediaStream) => {
                    const peerConfig: any = {
                        id: myUserId,
                        config: {
                            iceServers,
                        } /* Sample servers, please use appropriate ones */,
                    };
                    peer.current = new Peer(myUserId, peerConfig);

                    ws.current.emit('join-room', roomId, myUserId);

                    peer.current.on('call', (call: any) => {
                        call.answer(stream);
                        call.on('stream', function (remoteStream: any) {
                            console.log('newVideo');
                            newVideo({
                                remoteStream,
                                containerId: 'beforeUsers',
                                userId: call.peer,
                            });
                        });
                        call.on('close', () => {
                            console.log('close');
                            removeVideo({
                                containerId: 'beforeUsers',
                                userId: call.peer,
                            });
                        });
                    });
                    // 建自己的
                    // @ts-ignore
                    const video: HTMLVideoElement =
                        document.getElementById('#webRTC');
                    video.setAttribute('width', '300');
                    video.srcObject = stream;

                    (function () {
                        // const canvas: HTMLCanvasElement = document.querySelector('canvas');
                        //
                        // const ctx: any = canvas.getContext('2d');
                        //
                        // // @ts-ignore
                        // const captureStream = canvas.captureStream();
                        // const OutPut: any = document.getElementById('#OutPut')
                        // OutPut.srcObject = captureStream
                        //
                        // function update() {
                        //     ctx.drawImage(video, 0, 0, 256, 256);
                        //     ctx.fillText('SPIDER VIDEO !', 10, 20,);
                        //     requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.
                        // }
                        // video.addEventListener('loadedmetadata', () => {
                        //     video.play();
                        //     requestAnimationFrame(update)
                        // })
                        // OutPut.addEventListener('loadedmetadata', () => {
                        //     OutPut.play();
                        // })
                    })();

                    ws.current.on('user-list', (list: any) => {
                        setBeforeUserVideos(list);
                    });
                    ws.current.on('user-connected', (userId: string) => {
                        console.log(userId, ' user-connected');
                        setUserVideos((pre) => [
                            ...pre,
                            { GuestVideo: '', userId },
                        ]);
                        // 主动去取
                        const call = peer.current.call(userId, stream);
                        console.log(call);
                        // @ts-ignore
                        call &&
                            call.on('stream', (remoteStream: any) => {
                                //TODO TYPE
                                console.log('newVideo...');
                                newVideo({
                                    remoteStream,
                                    containerId: 'otherUsers',
                                    userId: call.peer,
                                });
                            });
                        call &&
                            call.on('close', () => {
                                removeVideo({
                                    containerId: 'otherUsers',
                                    userId: call.peer,
                                });
                            });
                    });
                    ws.current.on('user-disconnected', (userId: string) => {
                        console.log(userId, ' user-disconnected');
                        removeVideo({
                            containerId: 'beforeUsers',
                            userId,
                        });
                    });
                });
    };

    const sendMessage = async () => {
        setMessages((prevArray) => [...prevArray, message]);
        ws.current.emit('message', message);
        await setMessage('');
    };
    const handleUserIdChange = ({ target: { value } }: any) => {
        setUserId(value);
    };

    function handleClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const handleLeave = () => {
        ws.current.emit('leave-room', roomId, myUserId);
    };
    return (
        <div className={classes.SocketContainer}>
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
            <div className={classes.SocketContent}>
                <Paper className={classes.clientContainer}>
                    <h2>Check socket.io connection</h2>
                    <List>
                        {messages.map((message) => (
                            <ListItem key={message}>{message}</ListItem>
                        ))}
                    </List>
                    <TextField
                        id="standard-basic"
                        value={message}
                        onChange={handleMessageValueChange}
                        label="Standard"
                    />
                    <Button
                        size="small"
                        variant="contained"
                        onClick={sendMessage}
                    >
                        send
                    </Button>
                </Paper>
                <Paper className={classes.clientContainer} id="clientCon">
                    <h2>Start Live</h2>
                    <Box display="flex" flexDirection="row">
                        <TextField
                            id="roomId-basic"
                            required
                            value={roomId}
                            onChange={handleRoomIdChange}
                            label="房间号"
                        />
                        <TextField
                            id="userId-basic"
                            required
                            value={myUserId}
                            onChange={handleUserIdChange}
                            label="用户ID"
                        />
                        <Button
                            size="small"
                            variant="contained"
                            onClick={handleJoinIn}
                        >
                            加入
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={handleLeave}
                        >
                            离开
                        </Button>
                    </Box>

                    <div id="videoContainer"
                         // display="flex" flexDirection="row"
                    >
                        <Box flexDirection={'row'} display={"flex"}>
                            <h5>从设备取得画面</h5>
                            <video controls width={'300'} id="#webRTC">
                                <source src="" type="video/webm" />
                                Sorry, your browser doesn't support embedded
                                videos.
                            </video>
                        </Box>
                        <Box display={"flex"}>
                            <h5>从#webRTC捕获的画面</h5>
                            <canvas width="300" height="300">
                                An alternative text describing what your canvas
                                displays.
                            </canvas>
                        </Box>
                        <Box>
                            <h5>从canvas写入的流</h5>
                            <video controls width={'300'} id="#OutPut">
                                <source src="" type="video/webm" />
                                Sorry, your browser doesn't support embedded
                                videos.
                            </video>
                        </Box>
                    </div>

                    <Box display="flex" flexDirection="row">
                        <div id="otherUsers">
                            <h5>room中其他用户</h5>
                            {userVideos.map(({ GuestVideo, userId }) => (
                                <div key={userId} id="guestVideos">
                                    <h6>{userId}</h6>
                                </div>
                            ))}
                        </div>
                        <div id="beforeUsers">
                            <h5>room中之前用户</h5>
                            {beforeUserVideos.map((item) => (
                                <h6 key={item.userId}>{item}</h6>
                            ))}
                        </div>
                    </Box>
                </Paper>
            </div>
        </div>
    );
};
export default SocketContainer;
