import PageHeader from "@/components/ui/PageHeader";
import ECommerceShop from "@/components/ECommerce/Shop";

const ECommerceShopPage = () => {
  return (
    <div>
      <PageHeader>
        <PageHeader.Heading>Shop</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>
            E-Commerce Shop
          </PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <ECommerceShop />
    </div>
  );
};

export default ECommerceShopPage;
