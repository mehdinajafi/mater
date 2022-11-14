import { Box } from "@mui/material";
import ProductsFiltersDrawer from "./ProductsFiltersDrawer";

const ECommerceShop = () => {
  return (
    <Box>
      <ProductsFiltersDrawer minPrice={0} maxPrice={200} />
    </Box>
  );
};

export default ECommerceShop;
