import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";

interface IOrderSummeryCard {
  children: React.ReactNode;
  showEditButton?: boolean;
}

const OrderSummeryCard: React.FC<IOrderSummeryCard> = (props) => {
  return (
    <Card>
      <CardHeader
        title={<Typography variant="h6">Order Summary</Typography>}
        action={
          props.showEditButton && (
            <Button
              component={Link}
              to="/e-commerce/checkout/cart"
              size="small"
              startIcon={<PenIcon />}
            >
              Edit
            </Button>
          )
        }
      />

      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default OrderSummeryCard;
