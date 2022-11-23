import { Stack, Typography } from "@mui/material";

const ProductNotFound = () => {
  return (
    <Stack alignItems="center" spacing={10} textAlign="center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">Product Not Found!</Typography>
      <Typography variant="body1" color="text-secondary">
        The requested product may have been removed in "List" page.
      </Typography>
    </Stack>
  );
};

export default ProductNotFound;
