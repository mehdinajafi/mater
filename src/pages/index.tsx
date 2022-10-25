import FeaturedApps from "@/components/FeaturedApps";
import Greeting from "@/components/Greeting";
import { Container, Grid, Paper } from "@mui/material";

const AppPage = () => {
  return (
    <Container sx={{ px: { xs: 24, lg: 50 } }}>
      <Grid container spacing={24}>
        <Grid item xs={12} md={8}>
          <Greeting />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <FeaturedApps />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        boxShadow: theme.customShadows.card,
        borderRadius: theme.borderRadius["2xl"],
      })}
    >
      {props.children}
    </Paper>
  );
};

export default AppPage;
