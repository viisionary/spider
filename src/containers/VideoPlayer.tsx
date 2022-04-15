import * as React from "react";
import {useEffect, useRef, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import Hls from "hls.js";
import FlvJs from "flv.js";

import {ButtonGroup, Typography} from "@mui/material";
import downloadFile from "spider-utils/browser/downloadFile";
import Button from "@mui/material/Button";
import PresetFrom from 'spider-vision/Form/PresetForm'
import {FieldType, option} from "spider-vision/Form/type";
import {checkProtocol} from "../utils/locationUtils";
import ProgressSlider from "./ProgressSlider";
import UbiquitousPlayer from "./UbiquitousPlayer";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2022/4/13
 Time: 12:03 PM
 */
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fff'
    }
}));

function wait(delayInMS: number) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
}

function startRecording(stream: any, lengthInMS: number,) {
    let recorder = new MediaRecorder(stream);
    let data: any = [];

    recorder.ondataavailable = event => {
        return data.push(event.data);
    };
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        // @ts-ignore
        recorder.onerror = (event: MediaRecorderErrorEvent) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(
        () => recorder.state === "recording" && recorder.stop()
    );

    return Promise.all([
        stopped,
        recorded
    ])
        .then(() => data);
}

export default function VideoPlayer() {
    const styles = useStyles();

    const video = useRef<HTMLVideoElement>();
    const logElement = useRef<HTMLDivElement>();
    const camera = useRef<HTMLVideoElement>();

    const [fromValue, setFormValue] = useState<any>();

    const [logs, setLogs] = useState<string[]>([]);
    const [devices, setDevices] = useState<option[]>([]);


    useEffect(() => {
        logElement.current = document.getElementById('log') as HTMLDivElement;

        camera.current = document.getElementById('camera') as HTMLVideoElement;
        navigator.mediaDevices.enumerateDevices().then(devices => {
            setDevices(devices.map(item => ({value: item.deviceId, label: item.label})))
        })
    }, []);


    const handlePlay = () => {
        console.log('handle play', video.current?.play())
    }
    const handlePause = () => {
        console.log('handle play', video.current?.pause())
    }
    const handlePInP = () => {
        console.log('handle play', video.current?.requestPictureInPicture())
    }
    const handleFull = () => {
        video.current?.requestFullscreen();
    }
    const handleLogVideoInfo = () => {
        console.log('handle play', video.current?.getVideoPlaybackQuality())
        console.log('handle play', video.current?.muted)
        console.log('handle play', video.current?.playbackRate)
        console.log('handle play', video.current?.duration)
        console.log('handle play', video.current?.volume)
    }
    const handleShowDevices = () => {
        const devices = navigator.mediaDevices.enumerateDevices()
        console.log(devices);
    }
    const handleMute = () => {
        // video.current?.muted();
    }
    const handleOpenCamera = async () => {
        try {

            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            }).then(stream => {
                // @ts-ignore
                document.getElementById('camera').srcObject = stream
            });
        } catch (e) {
            console.error(e)
        }
    }
    const handleStopCamera = async () => {
        // @ts-ignore
        camera.current.srcObject.getTracks().forEach((track: MediaStreamTrack) => {
            console.log(track.kind, track.label)
            track.stop();
        });
    }
    const handleRecord = async () => {
        try {
            setLogs(prevState => prevState.concat('开始录屏...'))
            const preview = document.querySelector('#video');
            // @ts-ignore
            const recordedChunks = await startRecording(preview.captureStream(), 10000);
            setLogs(prevState => prevState.concat('正在下载...'))
            // @ts-ignore
            let recordedBlob = new Blob(recordedChunks, {type: "video/webm"});
            downloadFile(recordedBlob, 'record.webm')
            setLogs(prevState => prevState.concat('下载完毕...'))
        } catch (e) {
            console.error(e);
        }
    }
    const handleStopRecord = () => {

    }


    const handleDisplayMedia = async () => {
        try {
            // @ts-ignore
            camera.current.srcObject = await navigator.mediaDevices.getDisplayMedia()
            console.log(camera.current?.srcObject)
        } catch (e) {
            console.error(e)
        }
        // camera.current?.srcObject =
    }

    const handleLoad = (url: string) => {
        const {isFlv, isHls} = checkProtocol(url);
        console.log(isFlv, isHls);
        if (isFlv && FlvJs.isSupported()) {
            let videoElement: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
            let flvPlayer = FlvJs.createPlayer({
                type: 'flv',
                url
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            return
        }
        if (isHls && Hls.isSupported()) {
            video.current = document.getElementById('video') as HTMLVideoElement;
            let hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video.current);
            return;
            // @ts-ignore
        } else if (video.current.canPlayType('application/vnd.apple.mpegurl')) {
            // @ts-ignore
            video.current.src = url;
            return;
        }
    }

    const handleChange = (value: any) => {
        console.log(value)
    }
    const handleSubmit = (value: any) => {
        console.log(value)
        const {address} = value
        handleLoad(address)
    }
    const fields = [{id: "address", label: "直播地址", fieldType: FieldType.text},
        {
            id: 'devices',
            label: "设备",
            fieldType: FieldType.select,
            staticOptions: devices
        }]
    return (
        <React.Fragment>
            <CssBaseline/>
            <Box>
                <PresetFrom initialValues={{address: 'http://localhost:8080/live/livestream.m3u8'}}
                            fields={fields}
                            submitText={"加载"}
                    // @ts-ignore
                            submitPending={handleSubmit}
                            validateOnChange={true}
                            validate={handleChange}/>
            </Box>

            <Container fixed className={styles.root}>
                <UbiquitousPlayer videoId={'m3u8'} url={'http://localhost:8080/live/livestream.m3u8'}/>

                <Box sx={{margin: '20px auto', width: "600px", position: "relative"}}>
                    <Box sx={{position: "relative"}}>

                        <video id={"video"} width={600} src="" style={{border: "1px solid #ddd", flex: 1}}>
                        </video>
                        <ProgressSlider/>
                        <ButtonGroup sx={{position: "absolute", bottom: 0, left: 0}}>
                            {/*<Button onClick={handleLoad}>加载</Button>*/}
                            <Button onClick={handlePlay}>开始</Button>
                            <Button onClick={handlePause}>暂停</Button>
                            <Button onClick={handlePInP}>画中画</Button>
                            <Button onClick={handleFull}>全屏</Button>

                        </ButtonGroup>
                    </Box>

                    <video id={"camera"} autoPlay width={'300'} style={{border: "1px solid #ddd"}}>
                        <source src="" type="video/webm"/>
                        Sorry, your browser doesn't support embedded
                        videos.
                    </video>
                    <Box sx={{height: 200, overflowY: "auto", position: "absolute", bottom: 0}}>
                        {logs.map(item => {
                            return <Typography key={item}>{item}</Typography>
                        })}
                    </Box>
                </Box>

                <Box sx={{height: 200, overflowY: "auto"}}>
                    设备列表
                    {devices.map(({label, kind, deviceId}: any) => {
                        return <Typography key={deviceId}>{label} - {kind}</Typography>
                    })}
                </Box>

                <ButtonGroup>
                    <Button onClick={handlePInP}>开启弹幕</Button>
                    <Button onClick={handlePInP}>关闭弹幕</Button>
                </ButtonGroup>
                <br/>
                <Button onClick={handlePInP}>静音</Button>

                <Button onClick={handleLogVideoInfo}>视频信息</Button>
                <Button onClick={handleShowDevices}>查看设备</Button>
                <br/>

                <ButtonGroup>
                    <Button onClick={handleRecord}>录屏</Button>
                    <Button onClick={handleStopRecord}>停止录屏</Button>
                </ButtonGroup>

                <br/>

                <Button onClick={handleOpenCamera}>打开相机</Button>
                <Button onClick={handleStopCamera}>关闭相机</Button>
                <Button onClick={handleOpenCamera}>打开音频</Button>
                <Button onClick={handleStopCamera}>关闭音频</Button>
                <br/>
                <Button onClick={handleDisplayMedia} variant={"outlined"}>屏幕捕获</Button>

                <Typography>12</Typography>
                <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement">HTMLVideoElement</a>
            </Container>
        </React.Fragment>
    );
}
