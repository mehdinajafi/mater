import { Box, Chip, Rating, Typography } from "@mui/material";
import { ReactComponent as MacIcon } from "@/assets/icons/mac.svg";
import { ReactComponent as WindowsIcon } from "@/assets/icons/windows.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";
import kFormatter from "@/utils/kFormatter";
import IApplication from "@/types/interfaces/application";

interface IApplicationRow {
  application: IApplication;
}

const osLogo: Record<IApplication["os"], React.ReactNode> = {
  Windows: <WindowsIcon />,
  Mac: <MacIcon />,
};

const ApplicationRow: React.FC<IApplicationRow> = ({ application }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Box
        sx={(theme) => ({
          width: 48,
          height: 48,
          bgcolor: "gray.200",
          borderRadius: theme.borderRadius["xl"],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        })}
      >
        <img src={application.logo} alt="chrome" width={24} height={24} />
      </Box>

      <Box sx={{ minWidth: 160, flexGrow: 1 }}>
        <Typography variant="subtitle2">{application.name}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 4,
            color: "gray.600",
          }}
        >
          <Box flexShrink={0}>{osLogo[application.os]}</Box>
          <Typography variant="caption" ml={4} mr={8}>
            {application.os}
          </Typography>
          <Chip label="Free" color="success" />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexShrink: 0,
          pr: 24,
        }}
      >
        <Box
          sx={{
            "& .MuiRating-icon svg": {
              flexShrink: 0,
              maxWidth: "min-content",
            },
          }}
        >
          <Rating
            name="application-rating"
            defaultValue={2.5}
            readOnly
            precision={0.5}
            icon={<StarIcon width={20} height={20} />}
            emptyIcon={<StarIcon width={20} height={20} />}
          />
        </Box>
        <Typography variant="caption" sx={{ color: "gray.600", mt: 4 }}>
          {kFormatter(application.reviews)} reviews
        </Typography>
      </Box>
    </Box>
  );
};

export default ApplicationRow;
