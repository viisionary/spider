import React from 'react';
import { makeStyles } from '@mui/styles';
import LinearProgress, {Box, Typography} from '@mui/material';

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" minWidth={100} mr={1}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}


const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function LinearWithValueLabel({ progress }) {
    const classes = useStyles();
    // const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        // const timer = setInterval(() => {
        //   setProgress((prevProgress) =>
        //     prevProgress >= 100 ? 10 : prevProgress + 10
        //   );
        // }, 800);
        return () => {
            // clearInterval(timer);
        };
    }, []);

    progress = parseInt(progress);
    return (
        <div className={classes.root}>
            <LinearProgressWithLabel value={progress} />
        </div>
    );
}
