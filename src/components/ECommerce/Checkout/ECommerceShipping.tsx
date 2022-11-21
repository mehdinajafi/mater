import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import CheckoutStepper from "./CheckoutStepper";
import OrderSummeryCard from "./OrderSummeryCard";
import OrderSummeryRow from "./OrderSummeryRow";
import { IAddress } from "../interface/cart";
import getCart from "@/api/e-commerce/getCart";
import getUserAddresses from "@/api/e-commerce/getUserAddresses";
import { ReactComponent as ChevronLeftIcon } from "@/assets/icons/chevron-left.svg";

const ECommerceShipping = () => {
  const { data: cartData, isLoading: cartLoading } = useQuery(
    ["cart"],
    getCart
  );
  const { data: addressesData, isLoading: addressesLoading } = useQuery(
    ["user-addresses"],
    getUserAddresses
  );

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={8}>
        <CheckoutStepper activeStep="shipping" />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack spacing={24}>
          {addressesLoading &&
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width="100%"
                height={132}
              />
            ))}
          {addressesData &&
            addressesData.addresses.map((address: IAddress) => (
              <SingleAddress key={address.id} address={address} />
            ))}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              component={Link}
              to="/e-commerce/checkout/cart"
              size="small"
              color="dark"
              startIcon={<ChevronLeftIcon width={20} height={20} />}
            >
              Back
            </Button>
            {/* <Button
              size="small"
              startIcon={<PlusIcon width={20} height={20} />}
            >
              Add New Address
            </Button> */}
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <OrderSummeryCard>
          <Stack spacing={16}>
            <OrderSummeryRow
              title={`Sub Total ${
                cartData && "(" + cartData.cart.itemsCount + ")"
              }`}
              value={cartData && "$" + cartData.cart.rrpPrice}
              isLoading={cartLoading}
            />
            {cartData && cartData.cart.discount !== 0 && (
              <OrderSummeryRow
                title="Discount"
                value={cartData && "$" + cartData.cart.discount}
                isLoading={cartLoading}
              />
            )}
            {cartData && cartData.cart.discount !== 0 && <Divider />}
            <OrderSummeryRow
              isBold
              title="Total"
              value={cartData && "$" + cartData.cart.payablePrice}
              isLoading={cartLoading}
            />
          </Stack>
        </OrderSummeryCard>
      </Grid>
    </Grid>
  );
};

// ----------------------- Sinle Address ----------------------- //
interface ISingleAddress {
  address: IAddress;
}

const SingleAddress: React.FC<ISingleAddress> = ({ address }) => {
  const navigate = useNavigate();

  const handleDeliverToThisAddress = () => {
    navigate("/e-commerce/checkout/payment");
  };

  return (
    <Card component="address" sx={{ p: 24, position: "relative" }}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle1">
          {address.fullName}&nbsp;
          <Typography component="span" variant="body2" color="text-secondary">
            ({address.label})
          </Typography>
        </Typography>
        {address.isDefault && (
          <Chip color="info" label="Default" sx={{ ml: 8 }} />
        )}
      </Stack>

      <Typography variant="body2" my={8}>
        {address.address}
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={8}
      >
        <Typography variant="body2" color="text-secondary">
          0{address.mobile}
        </Typography>

        <Stack
          direction="row"
          spacing={8}
          sx={{
            position: { xs: "static", md: "absolute" },
            right: 24,
            bottom: 24,
          }}
        >
          {!address.isDefault && (
            <Button color="dark" variant="outlined" size="small">
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            onClick={handleDeliverToThisAddress}
          >
            Deliver To This Address
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ECommerceShipping;
