import React, {useEffect, useState} from 'react';
import {Interpreter} from "xstate";
import {DataContext, DataEvents} from "../machines/dataMachine";
import {useMachine} from "@xstate/react";
import {ItemDetailsMachine} from "../machines/ItemDetailsMachine";
import {
    Button,
    ButtonGroup,
    createStyles,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexDirection: 'row'
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);
const ItemDetailsContainer: React.FC<Props> = () => {
    const itemId = '1212'
    const [itemDetailState, sendItemDetail] = useMachine(ItemDetailsMachine);

    const [showParticipants, toggleShowParticipants] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        sendItemDetail("FETCH", {itemId});
    }, [sendItemDetail, itemId]);
    console.log(showParticipants)

    return (<>
        {itemDetailState.matches("success") && (
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={showParticipants ? 8 : 12}>
                    <video controls width={'100%'}>
                        <source src="/flower.webm"
                                type="video/webm" />
                        Sorry, your browser doesn't support embedded videos.
                    </video>
                    <ButtonGroup color="primary" size="large" variant="contained"
                                 aria-label="outlined primary button group">
                        <Button>静音</Button>
                        <Button>结束会议</Button>
                        <Button onClick={() => toggleShowParticipants(!showParticipants)}>参会人</Button>
                    </ButtonGroup>
                </Grid>
                {showParticipants && <Grid item xs={4}>
									<List>
										<ListItem alignItems="flex-start">
                        {/*<ListItemAvatar/>*/}
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
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
											/>
										</ListItem>
									</List>
								</Grid>}
            </Grid>
        )}
    </>)
}
export default ItemDetailsContainer;
