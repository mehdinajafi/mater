import { Container, Grid } from "@mui/material";
import TotalStats from "@/components/Cards/TotalStats";
import FeaturedApps from "@/components/FeaturedApps";
import Greeting from "@/components/Greeting";
import SectionCard from "@/components/Cards/SectionCard";
import NewInvoices from "@/components/NewInvoices";
import TopApplications from "@/components/TopApplications";
import ChromeIcon from "@/assets/icons/apps/chrome.svg";
import DriveIcon from "@/assets/icons/apps/drive.svg";

const AppPage = () => {
  return (
    <Container sx={{ px: { xs: 24, lg: 50 } }}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Greeting />
        </Grid>
        <Grid item xs={12} md={4}>
          <SectionCard>
            <FeaturedApps />
          </SectionCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalStats
            title="Active Users"
            color="primary"
            total={18765}
            history={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalStats
            title="Installed"
            color="info"
            total={4876}
            history={[1, 2, 3, 4, 5, 6, 7, 8, 10, 9]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalStats
            title="Downloads"
            color="warning"
            total={678}
            history={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <NewInvoices
            invoices={[
              {
                id: "INV-1666857553344",
                category: "Windows",
                price: 16.9,
                status: 0,
              },
              {
                id: "INV-1666857553345",
                category: "Windows",
                price: 35.71,
                status: 2,
              },
              {
                id: "INV-1666857553347",
                category: "Mac",
                price: 93.1,
                status: 1,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TopApplications
            applications={[
              {
                id: 0,
                logo: ChromeIcon,
                name: "Chrome",
                price: 0,
                os: "Mac",
                rate: 3,
                reviews: 4090,
              },
              {
                id: 1,
                logo: DriveIcon,
                name: "Drive",
                price: 35.71,
                os: "Mac",
                rate: 3,
                reviews: 71630,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppPage;
