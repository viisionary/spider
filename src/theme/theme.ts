// declare module '@mui/styles' {
//   interface DefaultTheme {
//     palette: { background: any };
//     spacing: any;
//   }
// }
// declare module '@mui/material/styles' {
//   interface DefaultTheme {
//     palette: { background: any };
//     spacing: any;
//   }
// }

import { Theme } from "@mui/material/styles";

declare module '@mui/material/styles' {
  interface DefaultTheme extends Theme {
    custom: string;
    spacing: any;
  }
}
// declare module '@mui/material/styles/createTheme' {
//   interface Theme {}
//   interface PaletteColor {
//     darker?: string;
//   }
//   interface SimplePaletteColorOptions {
//     darker?: string;
//   }
//
//   interface ThemeOptions {
//     // status: {
//     //   danger: React.CSSProperties['color'];
//     // };
//   }
// }

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
