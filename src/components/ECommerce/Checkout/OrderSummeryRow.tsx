import { Skeleton, Stack, Typography } from "@mui/material";

interface IOrderSummeryRow {
  title: string;
  value?: string;
  isLoading?: boolean;
  isBold?: boolean;
}

const OrderSummeryRow: React.FC<IOrderSummeryRow> = (props) => {
  const { title, value, isLoading, isBold } = props;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant={isBold ? "subtitle1" : "body2"}>{title}</Typography>
      {isLoading && (
        <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width={50} />
      )}
      {value && (
        <Typography variant={isBold ? "subtitle1" : "subtitle2"}>
          {value}
        </Typography>
      )}
    </Stack>
  );
};

export default OrderSummeryRow;
