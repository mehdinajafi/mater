import { ThemeOptions } from "@mui/material";
import { ReactComponent as ChevronDownIcon } from "@/assets/icons/chevron-down.svg";
import { ReactComponent as CheckSolidIcon } from "@/assets/icons/check-solid.svg";
import { ReactComponent as SquareIcon } from "@/assets/icons/square.svg";
import { ReactComponent as IndeterminateIcon } from "@/assets/icons/indeterminate.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";

const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        textTransform: "none",
        boxShadow: "none",
        borderRadius: theme.borderRadius.lg,
      }),
      contained: ({ theme }) => ({
        "&.MuiButton-containedDark": {
          color: theme.palette.mode === "light" ? "#fff" : "rgb(33, 43, 54)",
        },
      }),
      sizeLarge: {
        paddingBlock: "0.75rem",
      },
      startIcon: {
        flexShrink: 0,
      },
      endIcon: {
        flexShrink: 0,
      },
    },
  },
  MuiTypography: {
    variants: [
      {
        props: { color: "text-primary" },
        style: ({ theme }) => ({
          color: theme.palette.gray[800],
        }),
      },
      {
        props: { color: "text-secondary" },
        style: ({ theme }) => ({
          color: theme.palette.gray[600],
        }),
      },
      {
        props: { color: "disabled" },
        style: ({ theme }) => ({
          color: theme.palette.gray[500],
        }),
      },
    ],
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        boxShadow: theme.customShadows.card,
        borderRadius: theme.borderRadius["2xl"],
      }),
    },
  },
  MuiChip: {
    variants: [
      {
        props: { color: "success" },
        style: ({ theme }) => ({
          backgroundColor: "rgba(54, 179, 126, 0.16)",
          color: theme.palette.success.dark,
        }),
      },
      {
        props: { color: "error" },
        style: ({ theme }) => ({
          backgroundColor: "rgba(255, 86, 48, 0.16)",
          color: theme.palette.error.dark,
        }),
      },
      {
        props: { color: "warning" },
        style: ({ theme }) => ({
          backgroundColor: "rgba(255, 171, 0, 0.16)",
          color: theme.palette.warning.dark,
        }),
      },
      {
        props: { color: "info" },
        style: ({ theme }) => ({
          backgroundColor: "rgba(0, 184, 217, 0.16)",
          color: theme.palette.info.dark,
        }),
      },
    ],
    styleOverrides: {
      root: ({ theme }) => ({
        height: 24,
        borderRadius: theme.borderRadius.md,
      }),
      label: ({ theme }) => ({
        paddingInline: 8,
        fontSize: theme.typography.fontSizes.xs,
        fontWeight: theme.typography.fontWeights.bold,
      }),
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.gray[200],
        "& .MuiTableCell-root": {
          color: theme.palette.gray[600],
          fontWeight: 600,
        },
      }),
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: 0,
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        padding: 0,
      },
      root: ({ theme }) => ({
        "& .MuiPaper-root": {
          marginTop: theme.spacing(10),
          boxShadow: theme.customShadows.dropdown,
          borderRadius: theme.borderRadius.xl,
        },
      }),
    },
    defaultProps: {
      transformOrigin: { horizontal: "right", vertical: "top" },
      anchorOrigin: { horizontal: "right", vertical: "bottom" },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.fontSizes.sm,
        padding: theme.spacing(6, 8),
        borderRadius: theme.borderRadius.md,
      }),
    },
  },
  MuiDivider: {
    variants: [
      {
        props: { variant: "dashed" },
        style: {
          borderStyle: "dashed",
          borderColor: "rgba(145, 158, 171, 0.24)",
          "&:after": {
            borderTopStyle: "dashed",
          },
          "&:before": {
            borderTopStyle: "dashed",
          },
        },
      },
    ],
    styleOverrides: {
      root: {
        borderColor: "rgba(145, 158, 171, 0.24)",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: ({ theme }) => ({
        backgroundColor: theme.palette.gray[900],
        fontSize: theme.typography.fontSizes["2xs"],
        padding: theme.spacing(4, 8),
        borderRadius: theme.borderRadius.lg,
      }),
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: {
        lineHeight: 1.5,
      },
    },
  },
  MuiRating: {
    styleOverrides: {
      iconEmpty: {
        color: "rgba(145, 158, 171, 0.48)",
      },
    },
    defaultProps: {
      icon: <StarIcon width={20} height={20} />,
      emptyIcon: <StarIcon width={20} height={20} />,
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.semiBold,
        textTransform: "none",
        minHeight: 48,
        minWidth: 48,
        padding: 0,

        "& .MuiTab-iconWrapper": {
          marginRight: "0.5rem",
          width: 20,
          height: 20,
        },
      }),
    },
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        display: "flex",
        padding: "9px 13px 9px 12px",
      },
      sizeMedium: {
        "& .MuiSwitch-thumb": {
          width: 14,
          height: 14,
        },
        "& .MuiSwitch-track": {
          borderRadius: 14,
          width: 33,
          height: 20,
        },
        "& .MuiSwitch-switchBase": {
          padding: 12,
          left: 3,
          "&.Mui-checked": {
            transform: "translateX(13px)",
          },
        },
      },
      switchBase: ({ theme }) => ({
        "&.Mui-checked": {
          color: "#fff",
          "& + .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: theme.palette.primary.main,
          },
        },
      }),
      thumb: {
        boxShadow: "none",
      },
      track: ({ theme }) => ({
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,.35)"
            : "rgba(0,0,0,.25)",
      }),
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        margin: 0,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: {
        borderColor: "rgba(145, 158, 171, 0.32)",
        borderRadius: "0.5rem",
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.gray[500],
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiFormLabel-root": {
          color: theme.palette.gray[500],
        },
        "& .MuiNativeSelect-icon": {
          width: 16,
          height: 16,
          color: theme.palette.gray[500],
        },
      }),
    },
    variants: [
      {
        props: { color: "gray" },
        style: ({ theme }) => ({
          "& .MuiFormLabel-root.Mui-focused": {
            color: theme.palette.gray[800],
          },
          "& .MuiInputBase-root.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderWidth: 1,
              borderColor: theme.palette.gray[800],
            },
          },
        }),
      },
    ],
  },
  MuiPaper: {
    styleOverrides: {
      rounded: {
        borderRadius: "0.5rem",
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: {
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(33, 43, 54, 0.8)",
        },
      },
      paper: ({ theme }) => ({
        borderRadius: "16px",
        boxShadow: theme.customShadows.dialog,
      }),
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 24,
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      standardInfo: ({ theme }) => ({
        backgroundColor: theme.palette.info.lighter,
        color: theme.palette.info.darker,
        "& .MuiAlert-icon": {
          color: theme.palette.info.main,
        },
      }),
      standardSuccess: ({ theme }) => ({
        backgroundColor: theme.palette.success.lighter,
        color: theme.palette.success.darker,
        "& .MuiAlert-icon": {
          color: theme.palette.success.main,
        },
      }),
      standardWarning: ({ theme }) => ({
        backgroundColor: theme.palette.warning.lighter,
        color: theme.palette.warning.darker,
        "& .MuiAlert-icon": {
          color: theme.palette.warning.main,
        },
      }),
      standardError: ({ theme }) => ({
        backgroundColor: theme.palette.error.lighter,
        color: theme.palette.error.darker,
        "& .MuiAlert-icon": {
          color: theme.palette.error.main,
        },
      }),
      icon: {
        flexShrink: 0,
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      separator: {
        marginLeft: "1rem",
        marginRight: "1rem",
      },
    },
  },
  MuiSkeleton: {
    styleOverrides: {
      rounded: {
        borderRadius: "1rem",
      },
    },
  },
  MuiIconButton: {},
  MuiNativeSelect: {
    styleOverrides: {
      icon: {
        width: 16,
        height: 16,
      },
    },
    defaultProps: {
      IconComponent: ChevronDownIcon,
    },
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        width: 16,
        height: 16,
      },
    },
    defaultProps: {
      IconComponent: ChevronDownIcon,
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 8,
      },
    },
    defaultProps: {
      checkedIcon: <CheckSolidIcon width={24} height={24} />,
      icon: <SquareIcon width={24} height={24} />,
      indeterminateIcon: <IndeterminateIcon width={24} height={24} />,
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(24, 24, 0, 24),
      }),
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(24),
      }),
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: {
        border: "none",
        "& .MuiDataGrid-row": {
          "&:hover": {
            backgroundColor: "rgba(145, 158, 171, 0.08)",
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(145, 158, 171, 0.16)",
            "&:hover": {
              backgroundColor: "rgba(145, 158, 171, 0.08)",
            },
          },
        },
      },
      columnSeparator: {
        display: "none",
      },
      columnHeader: ({ theme }) => ({
        color: theme.palette.gray[600],
        "&.MuiDataGrid-columnHeader--sorted": {
          color: theme.palette.gray[800],
        },
      }),
      sortIcon: ({ theme }) => ({
        color: theme.palette.gray[600],
      }),
      cell: {
        borderBottom: "none",
      },
      columnHeaders: {
        borderBottom: "none",
      },
      columnHeadersInner: ({ theme }) => ({
        backgroundColor: theme.palette.gray[200],
      }),
      footerContainer: ({ theme }) => ({
        borderColor: "rgba(145, 158, 171, 0.24)",
        "& .MuiTablePagination-root": {
          "& .MuiTablePagination-select": {
            "&:focus": {
              borderRadius: theme.borderRadius.lg,
            },
          },
          "& .MuiTablePagination-actions": {
            "& .MuiIconButton-root": {
              color: theme.palette.gray[800],
              "&.Mui-disabled": {
                color: theme.palette.rgbToRgba(theme.palette.gray[500], 0.8),
              },
            },
          },
        },
      }),
    },
    defaultProps: {
      componentsProps: {
        basePopper: {
          sx: (theme: any) => ({
            "& .MuiPaper-root": {
              boxShadow: theme.customShadows.dropdown,
              "& .MuiList-root": {
                p: 8,
              },
            },
          }),
        },
        pagination: {
          sx: {},
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: (theme) => `
      @font-face {
        font-family: "Public Sans";
        font-style: normal;
        font-weight: 400;
        src: url("/assets/fonts/public-sans-v14-latin-regular.eot");
        src: local(""),
          url("/assets/fonts/public-sans-v14-latin-regular.eot?#iefix") format("embedded-opentype"),
          url("/assets/fonts/public-sans-v14-latin-regular.woff2") format("woff2"),
          url("/assets/fonts/public-sans-v14-latin-regular.woff") format("woff"),
          url("/assets/fonts/public-sans-v14-latin-regular.ttf") format("truetype"),
          url("/assets/fonts/public-sans-v14-latin-regular.svg#PublicSans") format("svg");
      }
      
      @font-face {
        font-family: "Public Sans";
        font-style: normal;
        font-weight: 500;
        src: url("/assets/fonts/public-sans-v14-latin-500.eot");
        src: local(""),
          url("/assets/fonts/public-sans-v14-latin-500.eot?#iefix") format("embedded-opentype"),
          url("/assets/fonts/public-sans-v14-latin-500.woff2") format("woff2"),
          url("/assets/fonts/public-sans-v14-latin-500.woff") format("woff"),
          url("/assets/fonts/public-sans-v14-latin-500.ttf") format("truetype"),
          url("/assets/fonts/public-sans-v14-latin-500.svg#PublicSans") format("svg");
      }

      @font-face {
        font-family: "Public Sans";
        font-style: normal;
        font-weight: 600;
        src: url("/assets/fonts/public-sans-v14-latin-600.eot");
        src: local(""),
          url("/assets/fonts/public-sans-v14-latin-600.eot?#iefix") format("embedded-opentype"),
          url("/assets/fonts/public-sans-v14-latin-600.woff2") format("woff2"),
          url("/assets/fonts/public-sans-v14-latin-600.woff") format("woff"),
          url("/assets/fonts/public-sans-v14-latin-600.ttf") format("truetype"),
          url("/assets/fonts/public-sans-v14-latin-600.svg#PublicSans") format("svg");
      }
    
      @font-face {
        font-family: "Public Sans";
        font-style: normal;
        font-weight: 700;
        src: url("/assets/fonts/public-sans-v14-latin-700.eot");
        src: local(""),
          url("/assets/fonts/public-sans-v14-latin-700.eot?#iefix") format("embedded-opentype"),
          url("/assets/fonts/public-sans-v14-latin-700.woff2") format("woff2"),
          url("/assets/fonts/public-sans-v14-latin-700.woff") format("woff"),
          url("/assets/fonts/public-sans-v14-latin-700.ttf") format("truetype"),
          url("/assets/fonts/public-sans-v14-latin-700.svg#PublicSans") format("svg");
      }

      html, body, #root {
        height: 100%;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      img, picture, video, canvas, svg {
        display: block;
        max-width: 100%;
      }
      
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type=number] {
        -moz-appearance: textfield;
      }
    
      address {
        font-style: normal;
      }

      /* -------------------- Start Snackbar --------------------  */

      .SnackbarContainer-root {
        &.SnackbarContainer-top.SnackbarContainer-right {
          top: 65px;
          z-index: 1200;
        }
      }

      .SnackbarItem-wrappedRoot {
        & .SnackbarContent-root {
          &.SnackbarItem-contentRoot {
            color: ${"#ffffff"};
            font-weight: ${theme.typography.fontWeights.semiBold};
            padding: ${theme.spacing(8)};
            box-shadow: ${theme.customShadows.z8};
            border-radius: ${theme.borderRadius.lg};
            background-color: ${theme.palette.gray[900]};

            & .SnackbarItem-action {
              margin-right: 0;
              & button {
                color: inherit;
              }
            }
          }

          & .icon-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            margin-right: ${theme.spacing(12)};
            border-radius: ${theme.borderRadius.xl};
          }

          & .SnackbarItem-message {
            padding: 0;
          }

          &.SnackbarItem-contentRoot.SnackbarItem-variantSuccess {
            color: ${theme.palette.text.primary};
            background-color: ${theme.palette.background.paper};
            & .icon-wrapper {
              color: ${theme.palette.success.main};
              background-color: ${theme.palette.rgbToRgba(
                theme.palette.success.main,
                0.16
              )};
            }
          }
          &.SnackbarItem-contentRoot.SnackbarItem-variantError {
            color: ${theme.palette.text.primary};
            background-color: ${theme.palette.background.paper};
            & .icon-wrapper {
              color: ${theme.palette.error.main};
              background-color: ${theme.palette.rgbToRgba(
                theme.palette.error.main,
                0.16
              )};
            }
          }
          &.SnackbarItem-contentRoot.SnackbarItem-variantInfo {
            color: ${theme.palette.text.primary};
            background-color: ${theme.palette.background.paper};
            & .icon-wrapper {
              color: ${theme.palette.info.main};
              background-color: ${theme.palette.rgbToRgba(
                theme.palette.info.main,
                0.16
              )};
            }
          }
          &.SnackbarItem-contentRoot.SnackbarItem-variantWarning {
            color: ${theme.palette.text.primary};
            background-color: ${theme.palette.background.paper};
            & .icon-wrapper {
              color: ${theme.palette.warning.main};
              background-color: ${theme.palette.rgbToRgba(
                theme.palette.warning.main,
                0.16
              )};
            }
          }
        }
      }

      /* -------------------- End Snackbar --------------------  */
    `,
  },
};

export default components;
