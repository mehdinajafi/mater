import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface IPageHeader {
  title: string;
  breadcrumbs: {
    title: string;
    to?: string;
    text?: boolean;
  }[];
}

const PageHeader: React.FC<IPageHeader> = (props) => {
  return (
    <Box mt={30} mb={40}>
      <Typography variant="h4" mb={8}>
        {props.title}
      </Typography>

      <Breadcrumbs
        aria-label="breadcrumb"
        separator={
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "gray.500",
            }}
          />
        }
      >
        {props.breadcrumbs.map((item) =>
          item.text ? (
            <Typography key={item.title} variant="body2" color="gray.500">
              {item.title}
            </Typography>
          ) : (
            <Link
              key={item.title}
              to={item.to || "/"}
              component={RouterLink}
              variant="body2"
              color="text.primary"
              underline="hover"
            >
              {item.title}
            </Link>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default PageHeader;
