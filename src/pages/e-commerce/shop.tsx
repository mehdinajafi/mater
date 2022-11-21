import PageHeader from "@/components/PageHeader";
import ECommerceShop from "@/components/ECommerce/Shop";

const ECommerceShopPage = () => {
  return (
    <div>
      <PageHeader
        title="Shop"
        breadcrumbs={[
          { to: "/", title: "Dashboard" },
          { to: "/e-commerce", title: "E-Commerce" },
          { title: "Shop", text: true },
        ]}
      />
      <ECommerceShop />
    </div>
  );
};

export default ECommerceShopPage;
