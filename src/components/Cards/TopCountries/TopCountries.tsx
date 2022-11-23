import IInstalledCountry from "@/types/interfaces/installedCountry";
import { Box, Card, CardHeader } from "@mui/material";
import TopCountryRow from "./TopCountryRow";

interface ITopCountries {
  countries: IInstalledCountry[];
}

const TopCountries: React.FC<ITopCountries> = ({ countries }) => {
  return (
    <Card>
      <CardHeader title="Top Installed Countries" />
      <Box
        sx={{
          py: 24,
          pl: 24,
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {countries.map((country) => (
          <TopCountryRow key={country.countryName} country={country} />
        ))}
      </Box>
    </Card>
  );
};

export default TopCountries;
