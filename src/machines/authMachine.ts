// @ts-ignore
import { assign, interpret, Machine, State } from 'xstate';
import { omit } from 'lodash';
import { httpClient } from '../utils/asyncUtils';
import { history } from '../utils/historyUtils';
import {User} from "../models";


export interface AuthMachineSchema {
    states: {
        unauthorized: {};
        loading: {};
        logout: {};
        authorized: {};
    };
}

export type AuthMachineEvents =
    | { type: 'LOGIN' }
    | { type: 'LOGOUT' }
    | { type: 'SIGNUP' };

export interface AuthMachineContext {
    user?: User;
    message?: string;
}

export const authMachine = Machine<
    AuthMachineContext,
    AuthMachineSchema,
    AuthMachineEvents
>(
    {
        id: 'authentication',
        initial: 'unauthorized',
        context: {
            user: undefined,
            message: undefined,
        },
        states: {
            unauthorized: {
                entry: 'resetUser',
                on: {
                    LOGIN: 'loading',
                },
            },
            loading: {
                invoke: {
                    src: 'performLogin',
                    onDone: { target: 'authorized', actions: 'onSuccess' },
                    onError: { target: 'unauthorized', actions: 'onError' },
                },
            },
            logout: {
                invoke: {
                    src: 'performLogout',
                    onDone: { target: 'unauthorized' },
                    onError: { target: 'unauthorized', actions: 'onError' },
                },
            },
            authorized: {
                entry: 'redirectHomeAfterLogin',
                on: {
                    LOGOUT: 'logout',
                },
            },
        },
    },
    {
        services: {
            performLogin: async (ctx, event) => {
                return await httpClient
                    .post(`/api/user/login`, event)
                    .then(({ data }) => {
                        history.push('/');
                        return { user: data };
                    })
                    .catch(
                        ({
                            response: {
                                data: { message },
                            },
                            status,
                        }) => {
                            throw new Error(message);
                        }
                    );
            },
            performSignUp: async (ctx, event) => {
                return await httpClient
                    .post(`/api/user/login`, event)
                    .then(({ data }) => {
                        history.push('/');
                        return { user: data };
                    })
                    .catch(
                        ({
                            response: {
                                data: { message },
                            },
                            status,
                        }) => {
                            throw new Error(message);
                        }
                    );
            },
            getUserProfile: async (ctx, event) => {
                const resp = await httpClient.get(
                    `http://localhost:3001/checkAuth`
                );
                return resp.data;
            },
            updateProfile: async (ctx, event: any) => {
                const payload = omit(event,'type', );
                const resp = await httpClient.patch(
                    `/api/users/${payload.id}`,
                    payload
                );
                return resp.data;
            },
            performLogout: async (ctx, event) => {
                localStorage.removeItem('authState');
                return await httpClient.patch(`/api/user/logout`);
            },
        },
        actions: {
            redirectHomeAfterLogin: async (ctx, event) => {
                if (history.location.pathname === '/signin') {
                    /* istanbul ignore next */
                    window.location.pathname = '/';
                }
            },
            resetUser: assign((ctx: any, event: any) => ({
                user: undefined,
            })),
            setUserProfile: assign((ctx: any, event: any) => ({
                user: event.data.user,
            })),
            onSuccess: assign((ctx: any, event: any) => ({
                user: event.data.user,
                message: undefined,
            })),
            onError: assign((ctx: any, event: any) => ({
                message: event.data.message,
            })),
        },
    }
);

// @ts-ignore
const stateDefinition = JSON.parse(localStorage.getItem('authState'));

let resolvedState;
if (stateDefinition) {
    const previousState = State.create(stateDefinition);

    // @ts-ignore
    resolvedState = authMachine.resolveState(previousState);
}

export const authService = interpret(authMachine)
    .onTransition((state) => {
        if (state.changed) {
            localStorage.setItem('authState', JSON.stringify(state));
        }
    })
    .start(resolvedState);
