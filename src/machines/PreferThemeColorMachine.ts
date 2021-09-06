import { assign, createMachine, interpret } from 'xstate';
import { lime, orange, pink } from '@material-ui/core/colors';

interface CustomThemeContext {
    primary: string;
    second: string;
}

const savedTheme = localStorage.getItem('themeState');
export const themeProps = {
    theme1: {
        primary: lime[500],
        second: lime[900],
    },
    theme2: {
        primary: orange[500],
        second: orange[900],
    },
    theme3: {
        primary: pink[500],
        second: pink[900],
    },
};
export const themeArray = [];

export const themeColorMachine = createMachine<
    CustomThemeContext,
    { type: 'CHANGE'; theme: string }
>(
    {
        id: 'themeColor',
        initial: undefined,
        states: {},
        on: {
            CHANGE: { actions: 'setTheme' },
        },
        // @ts-ignore
        context: themeProps[savedTheme || 'theme1'],
    },
    {
        actions: {
            // action implementation
            setTheme: assign((ctx: any, event: any) => {
                const { theme } = event;
                console.log(theme);
                // @ts-ignore
                return themeProps[theme];
            }),
        },
    }
);
export const themeColorService = interpret(themeColorMachine)
    .onTransition((state, context) => {
        if (state.event.theme) {
            console.log('set 了');
            localStorage.setItem('themeState', state.event.theme);
        }
    })
    .start();
