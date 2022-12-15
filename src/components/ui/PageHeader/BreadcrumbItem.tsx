import { Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface IPageHeaderBreadcrumbItem {
  href?: string;
  active?: boolean;
  children: React.ReactNode;
}

const PageHeaderBreadcrumbItem: React.FC<IPageHeaderBreadcrumbItem> = (
  props
) => {
  if (!props.href || props.active) {
    return (
      <Typography variant="body2" color="gray.500">
        {props.children}
      </Typography>
    );
  }

  return (
    <Link
      to={props.href}
      component={RouterLink}
      variant="body2"
      color="text.primary"
      underline="hover"
    >
      {props.children}
    </Link>
  );
};

export default PageHeaderBreadcrumbItem;
