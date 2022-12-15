import { Box } from "@mui/material";
import PageHeader from "@/components/ui/PageHeader";
import ECommercePayment from "@/components/ECommerce/Checkout/ECommercePayment";

const ECommercePaymentPage = () => {
  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Payment</PageHeader.Heading>
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
          <PageHeader.BreadcrumbItem active>Payment</PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <ECommercePayment />
    </Box>
  );
};

export default ECommercePaymentPage;
