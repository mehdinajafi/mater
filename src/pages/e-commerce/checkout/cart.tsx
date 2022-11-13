import PageHeader from "@/components/PageHeader";

const ECommerceCartPage = () => {
  return (
    <PageHeader
      title="Cart"
      breadcrumbs={[
        { to: "/", title: "Dashboard" },
        { to: "/e-commerce", title: "E-Commerce" },
        { title: "Cart", text: true },
      ]}
    />
  );
};

export default ECommerceCartPage;
