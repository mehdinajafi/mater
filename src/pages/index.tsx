import Greeting from "@/components/Greeting";
import { Container, Grid } from "@mui/material";

const AppPage = () => {
  return (
    <Container sx={{ px: { xs: 24, lg: 50 } }}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Greeting />
        </Grid>
        <Grid item xs={12} md={4}>
          a
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppPage;
