import { ThemeOptions } from "@mui/material";

const components: ThemeOptions["components"] = {
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
    `,
  },
};

export default components;
