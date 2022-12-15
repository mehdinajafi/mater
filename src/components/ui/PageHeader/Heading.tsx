import { Typography } from "@mui/material";

interface IPageHeaderHeading {
  children: React.ReactNode;
}

const PageHeaderHeading: React.FC<IPageHeaderHeading> = (props) => {
  return (
    <Typography variant="h4" mb={8}>
      {props.children}
    </Typography>
  );
};

export default PageHeaderHeading;
