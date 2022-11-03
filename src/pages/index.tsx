import { Box, Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import TotalStats from "@/components/TotalStats";
import FeaturedApps from "@/components/FeaturedApps";
import Greeting from "@/components/Greeting";
import NewInvoices from "@/components/NewInvoices";
import TopApplications from "@/components/TopApplications";
import TopCountries from "@/components/TopCountries";
import TopAuthors from "@/components/TopAuthors";
import ProfileCounter from "@/components/ProfileCounter";
import getHomePage from "@/api/getHomePage";

const AppPage = () => {
  const { data, isLoading } = useQuery(["home-page"], getHomePage);

  if (isLoading) {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rounded" height={280} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={280} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={166} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={166} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={166} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton variant="rounded" height={391} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="rounded" height={391} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={8}>
        <Greeting />
      </Grid>
      <Grid item xs={12} md={4}>
        <FeaturedApps />
      </Grid>
      <Grid item xs={12} md={4}>
        <TotalStats
          color="primary"
          title={data.totalStats.activeUsers.title}
          total={data.totalStats.activeUsers.total}
          history={data.totalStats.activeUsers.history}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TotalStats
          color="info"
          title={data.totalStats.installed.title}
          total={data.totalStats.installed.total}
          history={data.totalStats.installed.history}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TotalStats
          color="warning"
          title={data.totalStats.downloads.title}
          total={data.totalStats.downloads.total}
          history={data.totalStats.downloads.history}
        />
      </Grid>
      <Grid item xs={12} lg={8}>
        <NewInvoices invoices={data.invoices} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopApplications applications={data.topApplications} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopCountries countries={data.topCountries} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <TopAuthors authors={data.topAuthors} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 24, pb: 72 }}>
          <ProfileCounter
            title={data.appTotalStats.conversion.title}
            value={data.appTotalStats.conversion.value}
            percent={data.appTotalStats.conversion.percent}
          />
          <ProfileCounter
            title={data.appTotalStats.applications.title}
            value={data.appTotalStats.applications.value}
            percent={data.appTotalStats.applications.percent}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AppPage;
