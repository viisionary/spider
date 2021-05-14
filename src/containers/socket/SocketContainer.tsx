import React, {useEffect, useRef} from "react"
import {AccordionSummary, Button, List, ListItem, Paper, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {buildSocket} from "./fn";
import {httpClient} from "../../utils/asyncUtils";
import Peer from 'peerjs';
import Stream from "node:stream";

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
            // background: 'yellow',
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            [theme.breakpoints.down('md')]: {
                background: 'pink'
            },
        },
        SocketContent: {
            display: 'flex',
            flex: '1',
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
        clientContainer: {
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            padding: "20px 30px",
        }
    }),
);
let i: number = 0;
const SocketContainer: React.FC<Props> = ({}) => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [roomId, setRoomId] = React.useState<string>('');
    const [message, setMessage] = React.useState('how r u');
    const [myUserId, setUserId] = React.useState('');

    const classes = useStyles();

    //useRef 返回的对象将在组件的整个生命周期内保持不变。
    const ws = useRef<any>(null);
    // const myUserId: string = Math.random() + ''

    const peer = useRef<any>(null);

    useEffect(() => {
    })
    useEffect(() => {
        ws.current = buildSocket('http://localhost:3333/socket.io')
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
            peer.current = new Peer(myUserId);
            ws.current.emit('join-room', roomId, myUserId);
            peer.current.on('call', (call:any) => {
                call.answer(stream); // Answer the call with an A/V stream.
            });
            // 建自己的
            // @ts-ignore
            const video: HTMLVideoElement = document.getElementById('#webRTC');
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play();
            })
            ws.current.on('user-connected', (userId: string) => {
                // @ts-ignore
                const guestVideo: HTMLVideoElement = document.getElementById('guest')
                const call = peer.current.call(userId, stream);
                // @ts-ignore
                call && call.on('stream', (remoteStream) => {
                    guestVideo.srcObject = remoteStream
                    guestVideo.addEventListener('loadedmetadata', () => {
                        guestVideo.play();
                    })
                });
                call && call.on('close', () => {
                    guestVideo.remove()
                })
            })
            ws.current.on('user-disconnected', (userId: string) => {
                console.log(userId, ' user-connected');
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
    return <div className={classes.SocketContainer}>
        <h1>SocketContainer</h1>
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
                <p>{myUserId}</p>
                <p id="videoContainer">
                    <video controls width={'300'} id="#webRTC">
                        <source src="" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <video controls width={'300'} id="guest">
                        <source src="" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </p>


            </Paper>
        </div>
    </div>
}
export default SocketContainer
