import { Box, Container, Grid } from "@mui/material";
import TotalStats from "@/components/Cards/TotalStats";
import FeaturedApps from "@/components/FeaturedApps";
import Greeting from "@/components/Greeting";
import SectionCard from "@/components/Cards/SectionCard";
import NewInvoices from "@/components/NewInvoices";
import TopApplications from "@/components/TopApplications";
import ChromeIcon from "@/assets/icons/apps/chrome.svg";
import DriveIcon from "@/assets/icons/apps/drive.svg";
import TopCountries from "@/components/TopCountries";
import TopAuthors from "@/components/TopAuthors";
import ProfileCounter from "@/components/ProfileCounter";

const AppPage = () => {
  return (
    <Container>
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
        <Grid item xs={12} lg={8}>
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
        <Grid item xs={12} md={6} lg={4}>
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
        <Grid item xs={12} md={6} lg={4}>
          <TopCountries
            countries={[
              {
                countryName: "Germany",
                countryCode: "de",
                android: 1030,
                windows: 78950,
                mac: 11150,
              },
              {
                countryName: "England",
                countryCode: "en",
                android: 1030,
                windows: 78950,
                mac: 11150,
              },
              {
                countryName: "France",
                countryCode: "fr",
                android: 1030,
                windows: 78950,
                mac: 11150,
              },
              {
                countryName: "Korean",
                countryCode: "kr",
                android: 1030,
                windows: 78950,
                mac: 11150,
              },
              {
                countryName: "USA",
                countryCode: "us",
                android: 1030,
                windows: 78950,
                mac: 11150,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TopAuthors
            authors={[
              {
                avatar:
                  "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                name: "Deja Brady",
                likes: 17230,
              },
              {
                avatar:
                  "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                name: "Jayvion Simon",
                likes: 11870,
              },
              {
                avatar:
                  "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
                name: "Lucian Obrien",
                likes: 10560,
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 24, pb: 72 }}
          >
            <ProfileCounter title="conversion" value={38566} percent={48} />
            <ProfileCounter title="applications" value={55566} percent={75} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppPage;
