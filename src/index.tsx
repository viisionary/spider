import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { history } from './utils/historyUtils';
import { Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import { getTheme } from './styles';
import { useService } from '@xstate/react';
import { themeColorService } from './machines/PreferThemeColorMachine';
import { SettingsProvider } from './hooks/useSfx';

/* istanbul ignore next */
const onRedirectCallback = (appState: any) => {
    history.replace(
        (appState && appState.returnTo) || window.location.pathname
    );
};

function ThemeContext() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    // const [preferThemeColor, setPreferThemeColor] = useState<string>('1');
    const [themeColor] = useService(themeColorService);

    const theme = React.useMemo(
        () => getTheme(performance, themeColor),
        [themeColor]
    );

    return (
        <ThemeProvider theme={theme}>
            <SettingsProvider>
                <CssBaseline />
                <App />
            </SettingsProvider>
        </ThemeProvider>
    );
}

ReactDOM.render(
    <Router history={history}>
        <ThemeContext />
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
