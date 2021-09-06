import { assign, Machine } from 'xstate';

export interface DialogSchema {
    states: {
        invisible: {};
        visible: {};
    };
}

export type DialogEvents = { type: 'SHOW' } | { type: 'HIDE' };

export interface DialogContext {
    severity?: 'success' | 'info' | 'warning' | 'error';
    message?: string;
    content?: string;
    cancelCallback: () => void;
    confirmCallback: () => void;
}

export const dialogMachine = Machine<DialogContext, DialogSchema, DialogEvents>(
    {
        id: 'dialog',
        initial: 'invisible',
        context: {
            severity: undefined,
            message: undefined,
            content: undefined,
            cancelCallback: () => {},
            confirmCallback: () => {},
        },
        states: {
            invisible: {
                entry: 'resetSnackbar',
                on: { SHOW: 'visible' },
            },
            visible: {
                entry: 'setSnackbar',
                on: { HIDE: 'invisible' },
                after: {
                    // after 3 seconds, transition to invisible
                    // 3000: "invisible",
                },
            },
        },
    },
    {
        actions: {
            setSnackbar: assign((ctx, event: any) => ({
                severity: event.severity,
                message: event.message,
                content: event.content,
                confirmCallback: event.confirmCallback,
            })),
            resetSnackbar: assign((ctx, event: any) => ({
                severity: undefined,
                message: undefined,
                content: undefined,
                confirmCallback: () => {},
            })),
        },
    }
);
