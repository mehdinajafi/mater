import { Box } from "@mui/material";
import UserAccount from "@/components/UserAccount";
import PageHeader from "@/components/ui/PageHeader";

const UserAccountPage = () => {
  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Account</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/user/profile">
            User
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem active>
            Account Settings
          </PageHeader.BreadcrumbItem>
        </PageHeader.Breadcrumb>
      </PageHeader>

      <UserAccount />
    </Box>
  );
};

export default UserAccountPage;
