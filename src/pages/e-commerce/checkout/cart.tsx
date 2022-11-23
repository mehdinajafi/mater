import { Box } from "@mui/material";
import PageHeader from "@/components/ui/PageHeader";
import ECommerceCart from "@/components/ECommerce/Checkout/ECommerceCart";

const ECommerceCartPage = () => {
  return (
    <Box>
      <PageHeader
        title="Cart"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { title: "Cart", text: true },
        ]}
      />

      <ECommerceCart />
    </Box>
  );
};

export default ECommerceCartPage;
