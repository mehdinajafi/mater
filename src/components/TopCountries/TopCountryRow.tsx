import { Box, Typography } from "@mui/material";
import EnFlag from "@/assets/flags/en.svg";
import { ReactComponent as MacIcon } from "@/assets/icons/mac.svg";
import { ReactComponent as WindowsIcon } from "@/assets/icons/windows.svg";
import { ReactComponent as AndroidIcon } from "@/assets/icons/android.svg";
import kFormatter from "@/utils/kFormatter";
import IInstalledCountry from "@/types/interfaces/installedCountry";

interface ITopCountryRow {
  country: IInstalledCountry;
}

const countryFlag: Record<IInstalledCountry["countryCode"], string> = {
  de: EnFlag,
};

const TopCountryRow: React.FC<ITopCountryRow> = ({ country }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 8, minWidth: 120 }}
      >
        <Box flexShrink={0}>
          <img
            src={`/assets/icons/flags/${country.countryCode}.svg`}
            alt="en-flag"
          />
        </Box>
        <Typography variant="subtitle2">{country.countryName}</Typography>
      </Box>

      <OsWrapper>
        <AndroidIcon width={16} height={16} />
        <Typography variant="body2">{kFormatter(country.android)}</Typography>
      </OsWrapper>

      <OsWrapper>
        <WindowsIcon width={16} height={16} />
        <Typography variant="body2">{kFormatter(country.windows)}</Typography>
      </OsWrapper>

      <OsWrapper>
        <MacIcon width={16} height={16} />
        <Typography variant="body2">{kFormatter(country.mac)}</Typography>
      </OsWrapper>
    </Box>
  );
};

// ------------------------- OsWrapper -------------------------
const OsWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        minWidth: 72,
        "& svg": {
          flexShrink: 0,
          color: "gray.600",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TopCountryRow;
