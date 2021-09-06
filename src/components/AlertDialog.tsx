import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Interpreter } from 'xstate';
import { useService } from '@xstate/react';
import {
    DialogContext,
    DialogEvents,
    DialogSchema,
} from '../machines/DialogMachine';
// import {Interpreter} from "_xstate@4.18.0@xstate";
// import {DialogContext, DialogEvents, DialogSchema} from "../machines/DialogMachine";
// import {useService} from "_@xstate_react@1.3.2@@xstate/react";

interface Props {
    dialogService: Interpreter<DialogContext, DialogSchema, DialogEvents, any>;
}

export const AlertDialog: React.FC<Props> = ({ dialogService }) => {
    const [dialogState, sendDialogState] = useService(dialogService);
    const handleClose = () => {
        sendDialogState('HIDE');
    };
    const handleConfirm = () => {
        dialogState.context.confirmCallback();
        sendDialogState('HIDE');
    };

    return (
        <Dialog
            open={dialogState?.matches('visible')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">确认</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {dialogState.context?.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default" autoFocus>
                    取消
                </Button>
                <Button onClick={handleConfirm} color="primary">
                    确认
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AlertDialog;
