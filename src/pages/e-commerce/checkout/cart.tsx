import { Box } from "@mui/material";
import PageHeader from "@/components/ui/PageHeader";
import ECommerceCart from "@/components/ECommerce/Checkout/ECommerceCart";

const ECommerceCartPage = () => {
  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Cart</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/e-commerce/shop">
            E-Commerce Shop
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>Cart</PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <ECommerceCart />
    </Box>
  );
};

export default ECommerceCartPage;
