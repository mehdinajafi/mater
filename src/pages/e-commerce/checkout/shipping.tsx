import { Box } from "@mui/material";
import PageHeader from "@/components/ui/PageHeader";
import ECommerceShipping from "@/components/ECommerce/Checkout/ECommerceShipping";

const ECommerceShippingPage = () => {
  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Shipping</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/e-commerce/shop">
            E-Commerce Shop
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/e-commerce/checkout">
            Checkout
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>Shipping</PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <ECommerceShipping />
    </Box>
  );
};

export default ECommerceShippingPage;
