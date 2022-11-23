import { Box, Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import Carousel from "@/components/ui/Carousel";
import ProductPageSkeleton from "@/components/ECommerce/Product/ProductPageSkeleton";
import ProductDetails from "@/components/ECommerce/Product/ProductDetails";
import OrderProductForm from "@/components/ECommerce/Product/OrderProductForm";
import { ProductStatus } from "@/components/ECommerce/interface/product";
import getProduct from "@/api/e-commerce/getProduct";

const ProductPage = () => {
  const params = useParams();
  const { data, isLoading, isError } = useQuery(
    ["product", { id: params.productId }],
    getProduct
  );

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (isError) {
    return <div>Product Not Found!</div>;
  }

  const product = data.product;

  return (
    <Box>
      <PageHeader
        title="Product Details"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { to: "/e-commerce/shop", title: "Shop" },
          { text: true, title: product.title },
        ]}
      />

      <Grid container spacing={24}>
        <Grid item xs={12} md={6} lg={7}>
          <Carousel
            disableDots
            thumbs={product.gallery}
            arrowPosition="bottom-right"
            withCounter
          >
            {product.gallery.map((image) => (
              <Carousel.Item key={image}>
                <img src={image} alt="product-image" />
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <ProductDetails product={product} />
          {product.status !== ProductStatus.OutOfStock && (
            <>
              <Divider />
              <OrderProductForm product={product} />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
