import { Box, Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/ui/PageHeader";
import Carousel from "@/components/ui/Carousel";
import ProductPageSkeleton from "@/components/ECommerce/Product/ProductPageSkeleton";
import ProductDetails from "@/components/ECommerce/Product/ProductDetails";
import OrderProductForm from "@/components/ECommerce/Product/OrderProductForm";
import { ProductStatus } from "@/components/ECommerce/interface/product";
import ProductNotFound from "@/components/ECommerce/Product/ProductNotFound";
import ProductNotAvailableBox from "@/components/ECommerce/Product/ProductNotAvailableBox";
import getProduct from "@/api/e-commerce/getProduct";

const ProductPage = () => {
  const params = useParams();
  const { data, isLoading, isError } = useQuery(
    ["product", { id: params.productId }],
    getProduct,
    { refetchOnWindowFocus: false, staleTime: Infinity }
  );

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (isError) {
    return (
      <Box mt={100}>
        <ProductNotFound />
      </Box>
    );
  }

  const product = data.product;

  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Product Details</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/e-commerce/shop">
            E-Commerce Shop
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>
            {product.title}
          </PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

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
          {product.status === ProductStatus.OutOfStock && (
            <Box mt={16}>
              <ProductNotAvailableBox />
            </Box>
          )}
          {product.status !== ProductStatus.OutOfStock && (
            <>
              <Divider variant="dashed" sx={{ my: 24 }} />
              <OrderProductForm product={product} />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;
