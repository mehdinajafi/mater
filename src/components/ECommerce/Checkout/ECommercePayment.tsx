import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import OrderSummeryCard from "./OrderSummeryCard";
import CheckoutStepper from "./CheckoutStepper";
import OrderSummeryRow from "./OrderSummeryRow";
import DiscountForm from "./DiscountForm";
import { IAddress } from "../interface/cart";
import getPayment from "@/api/e-commerce/getPayment";
import { ReactComponent as ChevronLeftIcon } from "@/assets/icons/chevron-left.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/check-solid-rounded.svg";

type PaymentMethod = "Paypal" | "CreditCard" | "Cash";

const SPaymentMethodPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{
  isSelected: boolean;
}>(({ theme, isSelected }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",

  "& .MuiFormControlLabel-root": {
    padding: theme.spacing(14, 10, 14, 10),
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(24, 56, 24, 20),
    },
  },

  "& img": {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  "& .MuiFormControlLabel-label": {
    marginLeft: theme.spacing(8),
  },
  ...(isSelected && {
    boxShadow: theme.customShadows.z20,
  }),
}));

const ECommercePayment = () => {
  const { data: paymentData, isLoading: paymentLoading } = useQuery(
    ["payment"],
    getPayment
  );

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Paypal");

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
  };

  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={8}>
        <CheckoutStepper activeStep="payment" />
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Payment options" />
          <CardContent>
            <RadioGroup value={paymentMethod} onChange={handleMethodChange}>
              <Stack spacing={24}>
                <SPaymentMethodPaper
                  variant="outlined"
                  isSelected={paymentMethod === "Paypal"}
                >
                  <FormRadio
                    value="Paypal"
                    title="Pay with Paypal"
                    description="You will be redirected to PayPal website to complete your purchase securely."
                  />
                  <Box
                    component="img"
                    src="/assets/images/payments/paypal.svg"
                    alt="paypal"
                    width={36}
                    height={26.5}
                    sx={{ position: "absolute", right: 20 }}
                  />
                </SPaymentMethodPaper>

                <SPaymentMethodPaper
                  variant="outlined"
                  isSelected={paymentMethod === "CreditCard"}
                >
                  <FormRadio
                    value="CreditCard"
                    title="Credit / Debit Card"
                    description="We support Mastercard, Visa, Discover and Stripe."
                  />
                  <Box
                    component="img"
                    src="/assets/images/payments/visa.svg"
                    alt="visa"
                    width={36}
                    height={26.5}
                    sx={{ position: "absolute", right: 20 }}
                  />
                </SPaymentMethodPaper>

                <SPaymentMethodPaper
                  variant="outlined"
                  isSelected={paymentMethod === "Cash"}
                >
                  <FormRadio
                    value="Cash"
                    title="Cash on CheckoutDelivery"
                    description="Pay with cash when your order is delivered."
                  />
                </SPaymentMethodPaper>
              </Stack>
            </RadioGroup>
          </CardContent>
        </Card>
        <Button
          component={Link}
          to="/e-commerce/checkout/shipping"
          size="small"
          color="dark"
          sx={{ mt: 24 }}
          startIcon={<ChevronLeftIcon width={20} height={20} />}
        >
          Back
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={24}>
          <BillingAddress
            address={paymentData && paymentData.cartShipment.address}
            isLoading={paymentLoading}
          />

          <OrderSummeryCard showEditButton>
            <Stack spacing={16}>
              <OrderSummeryRow
                title={`Sub Total ${
                  paymentData && "(" + paymentData.cart.itemsCount + ")"
                }`}
                value={paymentData && "$" + paymentData.cart.rrpPrice}
                isLoading={paymentLoading}
              />
              {paymentData && paymentData.cart.discount !== 0 && (
                <OrderSummeryRow
                  title="Discount"
                  value={paymentData && "-$" + paymentData.cart.discount}
                  isLoading={paymentLoading}
                />
              )}
              <OrderSummeryRow
                title="Shipping"
                value={paymentData && (paymentData.shippingCost || "Free")}
                isLoading={paymentLoading}
              />
              <Divider />
              <OrderSummeryRow
                isBold
                title="Total"
                value={paymentData && "$" + paymentData.cart.payablePrice}
                isLoading={paymentLoading}
              />
              <DiscountForm />
            </Stack>
          </OrderSummeryCard>

          <Button variant="contained" size="large" fullWidth>
            Complete Order
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

// ---------------------- Form Radio ---------------------- //
interface IFormRadio {
  title: string;
  description: string;
  value: string;
}

const FormRadio: React.FC<IFormRadio> = (props) => {
  return (
    <FormControlLabel
      label={
        <Box>
          <Typography variant="subtitle2">{props.title}</Typography>
          <Typography variant="body2" color="text-secondary">
            {props.description}
          </Typography>
        </Box>
      }
      control={
        <Radio
          name={props.value}
          value={props.value}
          sx={{ flexShrink: 0 }}
          checkedIcon={<CheckIcon width={24} height={24} />}
        />
      }
    />
  );
};

// ---------------------- BillingAddress ---------------------- //
interface IBillingAddress {
  address?: IAddress;
  isLoading: boolean;
}

const BillingAddress: React.FC<IBillingAddress> = ({ isLoading, address }) => {
  return (
    <Card>
      <CardHeader
        title="Billing Address"
        action={
          <Button
            component={Link}
            to="/e-commerce/checkout/shipping"
            size="small"
            startIcon={<PenIcon />}
          >
            Edit
          </Button>
        }
      />

      <CardContent>
        {isLoading && (
          <Stack spacing={8}>
            <Skeleton
              variant="text"
              width={150}
              sx={{ fontSize: "0.875rem" }}
            />
            <Skeleton
              variant="text"
              width={200}
              sx={{ fontSize: "0.875rem" }}
            />
            <Skeleton variant="text" width={70} sx={{ fontSize: "0.875rem" }} />
          </Stack>
        )}
        {address && (
          <>
            <Stack direction="row" alignItems="center">
              <Typography variant="subtitle1">
                {address.fullName}&nbsp;
                <Typography
                  component="span"
                  variant="body2"
                  color="text-secondary"
                >
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

            <Typography variant="body2" color="text-secondary">
              0{address.mobile}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ECommercePayment;
