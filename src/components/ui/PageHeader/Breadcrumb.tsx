import { Box, Breadcrumbs } from "@mui/material";

interface IPageHeaderBreadcrumb {
  children: React.ReactNode;
}

const PageHeaderBreadcrumb: React.FC<IPageHeaderBreadcrumb> = (props) => {
  return (
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
      {props.children}
    </Breadcrumbs>
  );
};

export default PageHeaderBreadcrumb;
