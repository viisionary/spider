import React, { useEffect, useState } from 'react';
import { useMachine } from '@xstate/react';
import { ItemDetailsMachine } from '../machines/ItemDetailsMachine';
import {
    Button,
    ButtonGroup,
    createStyles,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: '800px',
            height: '2000px',
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    })
);
const DetailsContainer: React.FC<Props> = () => {
    const itemId = '1212';
    const [itemDetailState, sendItemDetail] = useMachine(ItemDetailsMachine);

    const [showParticipants, toggleShowParticipants] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        sendItemDetail('FETCH', { itemId });
    }, [sendItemDetail, itemId]);

    return (
        <>
            {itemDetailState.matches('success') && (
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={showParticipants ? 8 : 12}>
                        <ButtonGroup
                            color="primary"
                            size="large"
                            variant="contained"
                            aria-label="outlined primary button group"
                        >
                            <Button>静音</Button>
                            <Button>结束会议</Button>
                            <Button
                                onClick={() =>
                                    toggleShowParticipants(!showParticipants)
                                }
                            >
                                参会人
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    {showParticipants && (
                        <Grid item xs={4}>
                            <List>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        primary="Brunch this weekend?"
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    // className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Ali Connors
                                                </Typography>
                                                {
                                                    " — I'll be in your neighborhood doing errands this…"
                                                }
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};
export default DetailsContainer;
