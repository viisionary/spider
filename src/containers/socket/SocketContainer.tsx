import React, {useEffect, useRef} from "react"
import {
    AccordionSummary,
    Breadcrumbs,
    Button, Hidden,
    Link,
    List,
    ListItem,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {buildSocket} from "./fn";
import {httpClient} from "../../utils/asyncUtils";
import Peer from 'peerjs';
import Stream from "node:stream";
import {Context} from "vm";
import {ARTICLE} from "../../constant/Routes";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2021/5/10
 Time: 5:27 下午

 描述：
 **/

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            padding: "20px 30px",
            marginBottom: "20px",
        },
        breadcrumbs: {
            fontSize: '20px',
            padding: '10px 5px'
        }
    }),
);
let i: number = 0;
const SocketContainer: React.FC<Props> = ({}) => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [roomId, setRoomId] = React.useState<string>('123');
    const [message, setMessage] = React.useState('how r u');
    const [myUserId, setUserId] = React.useState('');

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
    })
    useEffect(() => {
        ws.current = buildSocket('https://api.visionary.top/socket.io')
        ws.current.on("connect", () => {
        });
        ws.current.on("message", (e: string) => {
            setMessages(prevArray => [...prevArray, e])
        });


        return () => {
            ws.current.close();
        }
    }, []);
    /**
     * 这里没有deps，只执行一次；
     * 相当于did mount
     */
    useEffect(() => {
    }, [messages]);

    const handleMessageValueChange = ({target: {value}}: any) => {
        setMessage(value)
    }
    const handleRoomIdChange = ({target: {value}}: any) => {
        setRoomId(value)
    }

    const handleJoinIn = ((): any => {
        if (!roomId) {
            return;
        }

        navigator.mediaDevices && navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then((stream: MediaStream) => {
            const peerConfig: any = {
                id: myUserId,
                config: {
                    'iceServers': [
                        {url: 'stun:stun.l.google.com:19302'},
                        {url: 'stun:stun.voipbuster.com'},
                        {url: 'stun:stun.voipstunt.com'},
                        {url: 'stun:stun-eu.3cx.com:3478'},
                        {url: 'stun:stun.voxgratia.org'},
                        {url: 'stun:stun.xten.com'},
                        {
                            url: 'turn:numb.viagenie.ca',
                            credential: 'muazkh',
                            username: 'webrtc@live.com'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=udp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        },
                        {
                            url: 'turn:192.158.29.39:3478?transport=tcp',
                            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                            username: '28224511:1379330808'
                        }
                    ]
                } /* Sample servers, please use appropriate ones */
            }
            peer.current = new Peer(myUserId, peerConfig);
            console.log(peer.current)
            ws.current.emit('join-room', roomId, myUserId);
            peer.current.on('call', (call: any) => {
                console.log('when call')
                call.answer(stream); // Answer the call with an A/V stream.
            });
            // 建自己的
            // @ts-ignore
            const video: HTMLVideoElement = document.getElementById('#webRTC');
            // const video:HTMLVideoElement = document.createElement('video');
            video.setAttribute('width', '300')
            // @ts-ignore
            // const videoContainer: HTMLElement = document.getElementById('videoContainer');
            // videoContainer.appendChild(video);
            const canvas: HTMLCanvasElement = document.querySelector('canvas');

            const ctx: any = canvas.getContext('2d');

            // @ts-ignore
            const captureStream = canvas.captureStream();
            const OutPut: any = document.getElementById('#OutPut')
            OutPut.srcObject = captureStream
            video.srcObject = stream;

            function update() {
                ctx.drawImage(video, 0, 0, 256, 256);
                ctx.fillText('SPIDER VIDEO !', 10, 20,);
                requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.
            }

            video.addEventListener('loadedmetadata', () => {
                video.play();
                requestAnimationFrame(update)
            })
            OutPut.addEventListener('loadedmetadata', () => {
                OutPut.play();
            })
            ws.current.on('user-connected', (userId: string) => {
                console.log(userId, ' user-connected');

                // @ts-ignore
                // const guestVideo: HTMLVideoElement = document.getElementById('guest')

                const call = peer.current.call(userId, stream);
                // @ts-ignore
                call && call.on('stream', (remoteStream) => {
                    const guestVideo: HTMLVideoElement = document.createElement('video');
                    console.log('新用户的流加入了，')
                    console.log('candidate', peer.current.candidate);
                    console.log('stream', remoteStream, peer.current)
                    guestVideo.setAttribute('width', '300')
                    // @ts-ignore
                    const videoContainer: HTMLElement = document.getElementById('videoContainer');
                    console.log('append')
                    videoContainer.appendChild(guestVideo);
                    guestVideo.srcObject = remoteStream
                    guestVideo.addEventListener('loadedmetadata', () => {
                        guestVideo.play();
                    })
                });
                call && call.on('close', () => {
                    // guestVideo.remove()
                })
            })
            ws.current.on('user-disconnected', (userId: string) => {
                console.log(userId, ' user-disconnected');
            })
        });

        // const peer = new Peer('pick-an-id');
        // const conn = peer.connect('another-peers-id');
        // conn.on('open', () => {
        //     conn.send('hi!');
        // });
    })
    const sendMessage = async () => {
        setMessages(prevArray => [...prevArray, message])
        ws.current.emit('message', message);
        await setMessage('');
    }
    const handleUserIdChange = ({target: {value}}: any) => {
        setUserId(value)
    }

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    return <div className={classes.SocketContainer}>
        <Hidden mdUp>
            <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
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
                <h2>send to server</h2>
                <List>
                    {messages.map((message) => (<ListItem key={message}>{message}</ListItem>))}
                </List>
                <TextField id="standard-basic" value={message} onChange={handleMessageValueChange} label="Standard" />
                <Button size="small" variant="contained" onClick={sendMessage}>send</Button>
            </Paper>
            <Paper className={classes.clientContainer} id="clientCon">
                <h2>send to another client</h2>
                <TextField id="roomId-basic" required value={roomId} onChange={handleRoomIdChange} label="房间号" />
                <TextField id="userId-basic" required value={myUserId} onChange={handleUserIdChange} label="用户名" />
                <Button size="small" variant="contained" onClick={handleJoinIn}>加入</Button>
                <p id="videoContainer">
                    <video controls width={'300'} id="#webRTC">
                        <source src="" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <canvas width="300" height="300">
                        An alternative text describing what your canvas displays.
                    </canvas>
                    <video controls width={'300'} id="#OutPut">
                        <source src="" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </p>
            </Paper>
        </div>
    </div>
}
export default SocketContainer
