import PageHeader from "@/components/PageHeader";

const ECommerceShippingPage = () => {
  return (
    <PageHeader
      title="Shipping"
      breadcrumbs={[
        { to: "/", title: "Dashboard" },
        { to: "/e-commerce", title: "E-Commerce" },
        { to: "/e-commerce/checkout", title: "Checkout" },
        { title: "Shipping", text: true },
      ]}
    />
  );
};

export default ECommerceShippingPage;
