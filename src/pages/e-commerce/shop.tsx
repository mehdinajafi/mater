import PageHeader from "@/components/PageHeader";

const ECommerceShopPage = () => {
  return (
    <PageHeader
      title="Shop"
      breadcrumbs={[
        { to: "/", title: "Dashboard" },
        { to: "/e-commerce", title: "E-Commerce" },
        { title: "Shop", text: true },
      ]}
    />
  );
};

export default ECommerceShopPage;
