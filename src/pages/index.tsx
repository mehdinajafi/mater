import { Container, Grid } from "@mui/material";
import TotalStats from "@/components/Cards/TotalStats";
import FeaturedApps from "@/components/FeaturedApps";
import Greeting from "@/components/Greeting";
import SectionCard from "@/components/Cards/SectionCard";

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
      </Grid>
    </Container>
  );
};

export default AppPage;
