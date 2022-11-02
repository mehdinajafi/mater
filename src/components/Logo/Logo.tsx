import { Box } from "@mui/material";
import { ReactComponent as LogoSvg } from "@/assets/images/logo.svg";

const Logo = () => {
  return (
    <Box
      component={LogoSvg}
      width={40}
      height={40}
      sx={{ display: "inline" }}
    />
  );
};

export default Logo;
