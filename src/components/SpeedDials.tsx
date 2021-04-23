import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import SpeedDial, {SpeedDialProps} from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
        },
        exampleWrapper: {
            position: 'relative',
            marginTop: theme.spacing(3),
            height: 380,
        },
        radioGroup: {
            margin: theme.spacing(1, 0),
        },
        speedDial: {
            position: 'absolute',
            '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
                bottom: theme.spacing(2),
                right: theme.spacing(2),
            },
            '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
                top: theme.spacing(2),
                left: theme.spacing(2),
            },
        },
    }),
);


export interface SpeedDialsActionType {
    name: string,
    icon: JSX.Element
}

interface Props {
    actions: SpeedDialsActionType[]
}

const SpeedDials: React.FC<Props> = ({actions}) => {
    const classes = useStyles();
    const [direction, setDirection] = React.useState<SpeedDialProps['direction']>('up');
    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <SpeedDial
            ariaLabel="SpeedDial example"
            className={classes.speedDial}
            hidden={hidden}
            icon={<SpeedDialIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                    title={action.name}
                />
            ))}
        </SpeedDial>
    );
}
export default SpeedDials
