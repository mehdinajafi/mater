import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-data-grid-pro/themeAugmentation";
import type {} from "@mui/x-data-grid-premium/themeAugmentation";

export declare module "@mui/material/styles" {
  // Theme
  interface Theme {
    borderRadius: IBorderRadius;
    customShadows: ICustomShadows;
  }
  interface ThemeOptions {
    borderRadius: IBorderRadius;
    customShadows: ICustomShadows;
  }

  // Palette
  interface Palette {
    gray: IGrayPalette;
    dark: PaletteOptions["primary"];
    rgbToRgba: (rgb: string, alpha: number) => string;
  }
  interface PaletteOptions {
    gray: IGrayPalette;
    dark: PaletteOptions["primary"];
    rgbToRgba: (rgb: string, alpha: number) => string;
  }
  interface TypeBackground {
    semiTransparent?: string;
  }
  interface TypeAction {
    attention?: string;
  }
  interface PaletteColor {
    darker: string;
    lighter: string;
    semiTransparent: string;
  }
  interface SimplePaletteColorOptions {
    darker: string;
    lighter: string;
    semiTransparent: string;
  }

  // Typography
  interface TypographyVariants {
    fontWeights: IFontWeights;
    fontSizes: IFontSizes;
  }
  interface TypographyVariantsOptions {
    fontWeights: IFontWeights;
    fontSizes: IFontSizes;
  }
}

// Divider
declare module "@mui/material/Divider" {
  interface DividerPropsVariantOverrides {
    dashed;
  }
}

// TextField
declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    gray;
  }
}

//Button
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true;
  }
}

// Interfaces
interface IGrayPalette {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

interface IBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  full: string;
}

interface IFontSizes {
  "2xs": string;
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  "7xl": string;
}

interface IFontWeights {
  regular: number;
  medium: number;
  semiBold: number;
  bold: number;
}

interface ICustomShadows {
  z1: string;
  z20: string;
  card: string;
  dropdown: string;
  dialog: string;
}
