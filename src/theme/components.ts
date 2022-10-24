import { ThemeOptions } from "@mui/material";

const components: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none",
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
  MuiMenu: {
    styleOverrides: {
      list: {
        padding: 0,
      },
      root: ({ theme }) => ({
        "& .MuiPaper-root": {
          marginTop: theme.spacing(10),
          boxShadow:
            "rgb(145 158 171 / 24%) 0px 0px 2px 0px, rgb(145 158 171 / 24%) -20px 20px 40px -4px",
          borderRadius: theme.borderRadius.xl,
        },
      }),
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
        },
      },
    ],
  },
  MuiCssBaseline: {
    styleOverrides: `
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

      a {
        color: inherit;
        text-decoration: none;
      }
    `,
  },
};

export default components;
