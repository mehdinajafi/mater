import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import Product from "@/components/ECommerce/Product";
import ProductPageSkeleton from "@/components/ECommerce/Product/ProductPageSkeleton";
import getProduct from "@/api/e-commerce/getProduct";

const ProductPage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery(
    ["product", { id: params.productId }],
    getProduct
  );

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  return (
    <Box>
      <PageHeader
        title="Product Details"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { to: "/e-commerce/shop", title: "Shop" },
          { text: true, title: data.product.title },
        ]}
      />

      <Product product={data.product} />
    </Box>
  );
};

export default ProductPage;
