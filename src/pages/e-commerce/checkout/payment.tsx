import PageHeader from "@/components/PageHeader";

const ECommercePaymentPage = () => {
  return (
    <PageHeader
      title="Payment"
      breadcrumbs={[
        { to: "/", title: "Dashboard" },
        { to: "/e-commerce", title: "E-Commerce" },
        { to: "/e-commerce/checkout", title: "Checkout" },
        { title: "Payment", text: true },
      ]}
    />
  );
};

export default ECommercePaymentPage;
