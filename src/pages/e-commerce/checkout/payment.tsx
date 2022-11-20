import { Box } from "@mui/material";
import PageHeader from "@/components/PageHeader";
import ECommercePayment from "@/components/ECommerce/Checkout/ECommercePayment";

const ECommercePaymentPage = () => {
  return (
    <Box>
      <PageHeader
        title="Payment"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { to: "/e-commerce/checkout", title: "Checkout" },
          { title: "Payment", text: true },
        ]}
      />

      <ECommercePayment />
    </Box>
  );
};

export default ECommercePaymentPage;
