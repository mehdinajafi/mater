import { Button } from "@mui/material";
import ECommerceList from "@/components/ECommerce/List";
import PageHeader from "@/components/ui/PageHeader";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";

const ECommerceListPage = () => {
  return (
    <div>
      <PageHeader
        actions={[
          <Button
            variant="contained"
            startIcon={<PlusIcon width={20} height={20} />}
          >
            New Product
          </Button>,
        ]}
      >
        <PageHeader.Heading>Product List</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>
            E-Commerce List
          </PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <ECommerceList />
    </div>
  );
};

export default ECommerceListPage;
