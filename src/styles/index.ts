import {createMuiTheme} from "@material-ui/core";
import {CSSProperties} from "react";

export const getTheme = (prefersDarkMode: any, themeColor: any) => {
    // @ts-ignore
    return createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: themeColor.context?.primary,
            },
            secondary: {
                main: themeColor.context?.second,
            },
        },
    })
};
export const fontFamily = 'jwf,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"';
export const flexRow: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    // alignItems: "center",
}
export const flexRowBetween: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0,
}
export const flexColumn: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
}

// stretch
export const flexColumnStretch: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "stretch",
    // justifyContent:/ 'space-between'
}
