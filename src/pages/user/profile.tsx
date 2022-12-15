import { Box, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Profile from "@/components/Profile";
import PageHeader from "@/components/ui/PageHeader";
import getProfile from "@/api/profile/getProfile";

const UserProfilePage = () => {
  const { data: profile, isLoading } = useQuery(["profile"], getProfile);

  return (
    <Box>
      <PageHeader>
        <PageHeader.Heading>Profile</PageHeader.Heading>
        <PageHeader.Breadcrumb>
          <PageHeader.BreadcrumbItem href="/">
            Dashboard
          </PageHeader.BreadcrumbItem>
          <PageHeader.BreadcrumbItem href="/user/profile">
            User
          </PageHeader.BreadcrumbItem>
          {isLoading && (
            <Skeleton width={80} variant="text" sx={{ fontSize: "1rem" }} />
          )}
          {profile && (
            <PageHeader.BreadcrumbItem active>
              {profile.name}
            </PageHeader.BreadcrumbItem>
          )}
        </PageHeader.Breadcrumb>
      </PageHeader>

      <Profile />
    </Box>
  );
};

export default UserProfilePage;
