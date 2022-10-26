import { Box, Paper, Stack, styled, Typography, useTheme } from "@mui/material";
import { ReactComponent as TrendUpIcon } from "@/assets/icons/trend-up.svg";
import { ReactComponent as TrendDownIcon } from "@/assets/icons/trend-down.svg";
import Chart from "react-apexcharts";
import addCommas from "@/utils/addCommas";
import SectionCard from "../SectionCard";

interface ITotalStats {
  title: "Active Users" | "Installed" | "Downloads";
  color: "primary" | "warning" | "info";
  total: number;
  history: number[];
}

const SStatus = styled("div", {
  shouldForwardProp: (prop) => prop !== "status",
})<{
  status: "profit" | "loss";
}>(({ theme, status }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius.full,
  width: 24,
  height: 24,

  ...(status === "profit" && {
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.lighter,
  }),
  ...(status === "loss" && {
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.lighter,
  }),
}));

const ChartWrapper = styled("div")(({ theme }) => ({
  width: 60,
  height: 100,
  "& .apexcharts-tooltip.apexcharts-theme-light": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(6px)",
    boxShadow: theme.customShadows.card,
    borderRadius: theme.borderRadius.xl,
    "& > div": {
      paddingBottom: 0,
    },
    "& .apexcharts-tooltip-text-y-value": {
      marginLeft: 0,
    },
  },
}));

const options = {
  tooltip: {
    x: {
      show: false,
    },
    y: {
      formatter: function (value: any) {
        return value;
      },
      title: {
        formatter: function () {
          return "";
        },
      },
    },
    marker: {
      show: false,
    },
  },
  grid: {
    show: false,
    padding: {
      right: 0,
      left: 0,
    },
  },
  plotOptions: {
    bar: {
      barHeight: "100%",
      borderRadius: 3,
    },
  },
  dataLabels: {
    enabled: false,
  },
  chart: {
    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    labels: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
};

const TotalStats: React.FC<ITotalStats> = (props) => {
  const theme = useTheme();
  const historyLenght = props.history.length;
  const change =
    (props.history[historyLenght - 1] - props.history[historyLenght - 2]) /
    props.history[historyLenght - 1];
  const changePresent = Math.floor(change * 100);
  const status = changePresent > 0 ? "profit" : "loss";

  return (
    <SectionCard p={24}>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography variant="subtitle2">Total {props.title}</Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              mt: 16,
              mb: 8,
            }}
          >
            <SStatus status={status}>
              {status === "profit" ? <TrendUpIcon /> : <TrendDownIcon />}
            </SStatus>
            <Typography variant="subtitle2">
              {status === "profit" ? "+" : ""}
              {changePresent}%
            </Typography>
          </Box>

          <Typography variant="h3">{addCommas(props.total)}</Typography>
        </Box>

        <ChartWrapper>
          <Chart
            options={{
              ...options,
              fill: {
                colors: [theme.palette[props.color].main],
              },
            }}
            series={[
              {
                name: "series-1",
                data: props.history,
              },
            ]}
            type="bar"
            height="100%"
          />
        </ChartWrapper>
      </Stack>
    </SectionCard>
  );
};
export default TotalStats;
