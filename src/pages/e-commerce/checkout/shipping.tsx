import { Box } from "@mui/material";
import PageHeader from "@/components/ui/PageHeader";
import ECommerceShipping from "@/components/ECommerce/Checkout/ECommerceShipping";

const ECommerceShippingPage = () => {
  return (
    <Box>
      <PageHeader
        title="Shipping"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { to: "/e-commerce/checkout", title: "Checkout" },
          { title: "Shipping", text: true },
        ]}
      />

      <ECommerceShipping />
    </Box>
  );
};

export default ECommerceShippingPage;
