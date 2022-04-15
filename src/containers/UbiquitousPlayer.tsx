import * as React from "react";
import {useEffect, useRef} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {makeStyles} from "@mui/styles";
import ProgressSlider from "./ProgressSlider";
import {Box, ButtonGroup, Popover, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {checkProtocol} from "../utils/locationUtils";
import FlvJs from "flv.js";
import Hls from "hls.js";

/**
 Created by IntelliJ IDEA.
 User: visionary
 Date: 2022/4/13
 Time: 4:32 PM
 */
const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#fff'
    }
}));

interface Props {
    url?: string,
    stream?: MediaStream,
    videoId: string
}

const UbiquitousPlayer: React.FC<Props> = ({url, stream, videoId}) => {
    const video = useRef<HTMLMediaElement & HTMLVideoElement>();
    useEffect(() => {
        video.current = document.getElementById(videoId) as HTMLMediaElement & HTMLVideoElement
        if (!url) {
            return;
        }
        const {isFlv, isHls} = checkProtocol(url);
        if (video.current && isFlv && FlvJs.isSupported()) {
            // let videoElement: HTMLVideoElement = video.current as HTMLVideoElement;
            let flvPlayer = FlvJs.createPlayer({
                type: 'flv',
                url
            });
            flvPlayer.attachMediaElement(video.current);
            flvPlayer.load();
            flvPlayer.play();
            return
        }
        if (video.current && isHls && Hls.isSupported()) {
            // video.current = document.getElementById('video') as HTMLVideoElement;
            let hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video.current);
            return;
            // @ts-ignore
        } else if (video.current && video.current.canPlayType('application/vnd.apple.mpegurl')) {
            // @ts-ignore
            video.current.src = url;
            return;
        }
    }, [url]);

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
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const styles = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container sx={{position: "relative"}}
                       onMouseEnter={handlePopoverOpen}
                       onMouseLeave={handlePopoverClose}>
                <video
                    id={videoId} width={600} src="" style={{border: "1px solid #ddd", flex: 1}}>
                </video>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Box sx={{p: 1, flex: 1}}>
                        <Typography/>
                        直播中
                        <ProgressSlider/>
                        <ButtonGroup sx={{position: "absolute", bottom: 0, left: 0}}>
                            <Button onClick={handlePlay}>开始</Button>
                            <Button onClick={handlePause}>暂停</Button>
                            <Button onClick={handlePInP}>画中画</Button>
                            <Button onClick={handleFull}>全屏</Button>
                        </ButtonGroup>
                    </Box>
                </Popover>
            </Container>
        </React.Fragment>
    );
}
export default UbiquitousPlayer