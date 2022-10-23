import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography: TypographyOptions = {
  fontFamily: [
    "Public Sans",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
  ].join(","),
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  fontSize: {
    "2xs": "0.65rem",
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },
  h1: {
    fontSize: 64,
    lineHeight: "80px",
    fontWeight: 800,
  },
  h2: {
    fontSize: 48,
    lineHeight: "64px",
    fontWeight: 800,
  },
  h3: {
    fontSize: 32,
    lineHeight: "48px",
    fontWeight: 700,
  },
  h4: {
    fontSize: 24,
    lineHeight: "36px",
    fontWeight: 700,
  },
  h5: {
    fontSize: 20,
    lineHeight: "30px",
    fontWeight: 700,
  },
  h6: {
    fontSize: 18,
    lineHeight: "28px",
    fontWeight: 700,
  },
  subtitle1: {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 600,
  },
  subtitle2: {
    fontSize: 14,
    lineHeight: "22px",
    fontWeight: 600,
  },
  body1: {
    fontSize: 16,
    lineHeight: "24px",
    fontWeight: 400,
  },
  body2: {
    fontSize: 14,
    lineHeight: "22px",
    fontWeight: 400,
  },

  caption: {
    fontSize: 12,
    lineHeight: "18px",
    fontWeight: 400,
  },
  overline: {
    fontSize: 12,
    lineHeight: "18px",
    fontWeight: 700,
  },
  button: {
    fontSize: 14,
    lineHeight: "24px",
    fontWeight: 700,
  },
};

export default typography;
