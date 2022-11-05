import { Box } from "@mui/material";
import { ReactComponent as LogoSvg } from "@/assets/images/logo.svg";

interface ILogo {
  width?: number;
  height?: number;
}

const Logo: React.FC<ILogo> = ({ width = 40, height = 40 }) => {
  return (
    <Box
      component={LogoSvg}
      width={width}
      height={height}
      sx={{ display: "inline" }}
    />
  );
};

export default Logo;
