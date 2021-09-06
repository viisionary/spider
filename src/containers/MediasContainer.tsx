import React, { useEffect } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        MediasContainer: {
            flex: 1,
            [theme.breakpoints.down('md')]: {
                background: 'pink',
            },
        },
    })
);
const MediasContainer: React.FC<Props> = ({}) => {
    const [open, setOpen] = React.useState(true);
    const handleToggle = () => {
        setOpen(!open);
    };
    useEffect(() => {}, []);
    const classes = useStyles();

    return (
        <div className={classes.MediasContainer}>
            <h1>MediasContainer</h1>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h2>h5 video</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <video controls width={'100%'}>
                        <source src="/flower.webm" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <h2>Media Capture and Streams API (Media Stream)</h2>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h2>audio</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <h3>Web Audio API</h3>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h2>track</h2>
                </AccordionSummary>
                <AccordionDetails>
                    <h3>Web Audio API</h3>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h2>WebRTC</h2>
                    <video controls width={'300'} id="#webRTC">
                        <source src="" type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
            </Accordion>
            <Button variant="contained" onClick={handleToggle}>
                {open.toString()}
            </Button>
        </div>
    );
};
export default MediasContainer;
