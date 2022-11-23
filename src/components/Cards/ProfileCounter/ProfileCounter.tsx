import { Box, styled, Typography, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import addCommas from "@/utils/addCommas";
import { ReactComponent as UserIcon } from "@/assets/icons/user-solid.svg";
import { ReactComponent as MailIcon } from "@/assets/icons/mail.svg";

interface IProfileCounter {
  title: "conversion" | "applications";
  value: number;
  percent: number;
}

const ChartWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: 86,
  width: 86,
  flexShrink: 0,
  "& > div": {
    marginBottom: -10,
  },
  "& .apexcharts-datalabels-group": {
    transform: "translate(1px,-4px)",
  },
  "& .apexcharts-datalabel-value": {
    fontSize: "0.875rem",
    fontFamily: "Public Sans, sans-serif !important",
    fontWeight: 700,
    fill: "#ffffff",
  },
}));

const chartOptions = {
  chart: {
    sparkline: {
      enabled: false,
    },
  },
  stroke: {
    width: 0,
  },
  grid: {
    padding: {
      right: 0,
      left: 0,
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "90%",
        labels: {
          show: true,
          name: {
            show: false,
          },
          value: {
            show: true,
            formatter: (val: string) => `${val}%`,
          },
          total: {
            show: true,
            showAlways: true,
            label: "Total",

            formatter: function (w: any) {
              return `${w.globals.seriesTotals[0]}%`;
            },
          },
        },
      },
    },
  },
};

const componentVariant: Record<
  IProfileCounter["title"],
  { color: "primary" | "info"; icon: React.ReactNode }
> = {
  conversion: {
    color: "primary",
    icon: <UserIcon />,
  },
  applications: {
    color: "info",
    icon: <MailIcon />,
  },
};

const ProfileCounter: React.FC<IProfileCounter> = (props) => {
  const theme = useTheme();
  const color = componentVariant[props.title].color;

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        gap: 24,
        p: 24,
        bgcolor: `${color}.dark`,
        borderRadius: theme.borderRadius["2xl"],
      })}
    >
      <ChartWrapper>
        <ReactApexChart
          options={{
            ...chartOptions,
            fill: {
              colors: [theme.palette[color].main, "rgba(145, 158, 171, 0.16)"],
            },
          }}
          series={[props.percent, 100 - props.percent]}
          height={80}
          type="donut"
        />
      </ChartWrapper>

      <Box color="#fff">
        <Typography variant="h4">{addCommas(props.value)}</Typography>
        <Typography
          variant="body2"
          sx={{ opacity: 0.72, textTransform: "capitalize" }}
        >
          {props.title}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "absolute",
          right: -24,
          color: "#fff",
          "& svg": {
            opacity: 0.12,
            width: 120,
            height: 120,
          },
        }}
      >
        {componentVariant[props.title].icon}
      </Box>
    </Box>
  );
};

export default ProfileCounter;
