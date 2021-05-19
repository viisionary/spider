import {createMuiTheme, Paper} from "@material-ui/core";
import {green, lime, pink} from "@material-ui/core/colors";
import React, {CSSProperties} from "react";

export const getTheme = (prefersDarkMode: any, themeColor: any) => {
    // @ts-ignore
    // console.log('preferThemeColor',themeColor)
    // {themeColor.context?.primary}
    // {themeColor.context?.second}
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

export const flexRow: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'row',
    // alignItems: "center",
}
export const flexColumn: CSSProperties = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
}
