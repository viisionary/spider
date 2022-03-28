import { createTheme } from "@mui/material/styles";

const borderColor = "rgba(175, 185, 204, 0.5)";
// 10px = 0.625rem
// 12px = 0.75rem
// 14px = 0.875rem
// 16px = 1rem（基础）
// 18px = 1.125rem
// 20px = 1.25rem
// 24px = 1.5rem
// 30px = 1.875rem
// 32px = 2rem

export const theme = createTheme(
  {
    spacing: 4,
    typography: {
      fontSize: 14, // 正文
      h1: {},
      h2: { fontSize: "2.57rem" }, // slogan
      h3: { fontSize: "2.215rem" }, //29.75px 大标题
      h4: { fontSize: "1.5rem", fontWeight: 700 }, // 21px 次标题
      h5: { fontSize: "1rem", fontWeight: 700 },
      h6: {
        fontWeight: 500,
        // 16px
        fontSize: "1rem",
        // wordBreak: "break-all",
        textOverflow: "ellipsis",
        // whiteSpace: "pre",
        overflow: "hidden"
      },
      subtitle1: {},
      subtitle2: { padding: 2, fontWeight: 600, fontSize: "1rem" },
      body1: {
        fontSize: "0.875rem",
        textOverflow: "ellipsis",
        overflow: "hidden"
      },
      body2: { fontSize: "0.875rem" },
      caption: { fontSize: "0.875rem" }, // 辅助,
      overline: {}
    },
    palette: {
      primary: {
        main: "#2560F7"
      },
      secondary: {
        main: "#8E98B4",
        contrastText: "#8E98B4"
      },
      info: {
        main: "#1D2341",
        contrastText: "#fff"
      },
      background: {
        paper: "#fff",
        default: "#F2F6FC"
      },
      text: {
        primary: "#1D2341",
        secondary: "#8E98B4",
        disabled: "#E9E7EF"
      },
      neutral: {
        main: borderColor,
        contrastText: "#fff"
      },
      error: {
        main: "#f5222d"
      },
      success: {
        main: "rgba(103, 194, 58, 1)"
      },
      warning: {
        main: "#FAAD14"
      },
      common: {}
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            // borderColor: "red",
            fontSize: "1rem"
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "&:before": {
              borderBottom: "1px solid rgba(142, 152, 180, 0.25)"
            }
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          standard: {
            // borderColor: "red"
          }
        }
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            borderRadius: 10
          }
        }
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "16px"
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: "10px 16px",
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: "1.125rem",
            border: "1px solid rgba(142, 152, 180, 0.25)"
          }
        }
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            border: 1
          },
          standardSuccess: {}
        }
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {}
        }
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {}
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: "88px",
            height: "32px",
            boxShadow: "none"
          }
        }
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            " .MuiSvgIcon-root": {
              width: 18,
              height: 18,
              borderRadius: 2
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "none"
          }
        }
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(142, 152, 180, 0.25)"
          }
        }
      },
      MuiBreadcrumbs: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            "p": {
              fontSize: "1rem"
            }
          }
        }
      }
    }
  },
  {}
);
