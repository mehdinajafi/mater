import {
  Step,
  StepConnector,
  stepConnectorClasses,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as WalletIcon } from "@/assets/icons/wallet.svg";
import { ReactComponent as ShoppingCartIcon } from "@/assets/icons/shopping-cart.svg";
import { ReactComponent as TruckDeliveryIcon } from "@/assets/icons/truck-delivery.svg";

interface ICheckoutStepper {
  activeStep: "cart" | "shipping" | "payment";
}

const ActiveStep = {
  cart: 0,
  shipping: 1,
  payment: 2,
};

const steps = {
  1: {
    label: "Cart",
    icon: <ShoppingCartIcon width={25} height={25} />,
    href: "/e-commerce/checkout/cart",
  },
  2: {
    label: "Shipping",
    icon: <TruckDeliveryIcon width={25} height={25} />,
    href: "/e-commerce/checkout/shipping",
  },
  3: {
    label: "Payment",
    icon: <WalletIcon width={25} height={25} />,
    href: "/e-commerce/checkout/payment",
  },
};

const SStepLabel = styled(StepLabel)(({ theme }) => ({
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
  "& .MuiStepLabel-label.Mui-disabled, & .MuiStepLabel-iconContainer.Mui-disabled":
    {
      color: theme.palette.gray[500],
    },
  "& .MuiStepLabel-label.Mui-completed, & .MuiStepLabel-iconContainer.Mui-completed":
    {
      color: theme.palette.primary.light,
    },
  "& .MuiStepLabel-label.Mui-active, & .MuiStepLabel-iconContainer.Mui-active":
    {
      color: theme.palette.primary.main,
    },
}));

const SStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.lighter,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.lighter,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const StepIcon = (props: StepIconProps) => {
  const { icon } = props;
  return <div>{steps[icon as keyof typeof steps].icon}</div>;
};

const CheckoutStepper: React.FC<ICheckoutStepper> = (props) => {
  return (
    <Stepper
      activeStep={ActiveStep[props.activeStep]}
      connector={<SStepConnector />}
    >
      {Object.values(steps).map((step, index) => (
        <Step key={step.label}>
          {index < ActiveStep[props.activeStep] ? (
            <Link to={step.href}>
              <SStepLabel StepIconComponent={StepIcon}>{step.label}</SStepLabel>
            </Link>
          ) : (
            <SStepLabel StepIconComponent={StepIcon}>{step.label}</SStepLabel>
          )}
        </Step>
      ))}
    </Stepper>
  );
};

export default CheckoutStepper;
