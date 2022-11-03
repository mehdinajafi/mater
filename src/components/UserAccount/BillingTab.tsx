import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Link,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import getAccountBilling from "@/api/user-account/getAccountBilling";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as VerticalDotsIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";

interface IAccountPlan {
  name: string;
}

interface IBillingBankCard {
  id: string;
  bankLogo: string;
  number: string;
}

interface IBillingAddress {
  id: string;
  name: string;
  address: string;
  phone: string;
}

interface IBillingInvoice {
  id: string;
  date: number;
  price: number;
  link: string;
}

interface IBilling {
  plan: IAccountPlan;
  cards: IBillingBankCard[];
  addresses: IBillingAddress[];
  invoices: IBillingInvoice[];
}

const BillingTab = () => {
  const {
    data: accountBilling,
    isLoading,
    isError,
  } = useQuery<IBilling>(["account-billing"], getAccountBilling);

  if (isLoading) {
    return (
      <Grid container spacing={40}>
        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          flexDirection="column"
          gap={24}
        >
          <Skeleton variant="rounded" height={132} />
          <Skeleton variant="rounded" height={200} />
          <Skeleton variant="rounded" height={400} />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          flexDirection="column"
          gap={24}
        >
          <Skeleton variant="rounded" height={24} />
          <Skeleton variant="rounded" height={24} />
          <Skeleton variant="rounded" height={24} />
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    // TODO: Show proper error
    return <div>Something went wrong!</div>;
  }

  return (
    <Grid container spacing={40}>
      <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={24}>
        <Card sx={{ p: 24 }}>
          <Box sx={{ position: "relative", mb: 24 }}>
            <Typography variant="overline" color="text-secondary">
              YOUR PLAN
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 8,
                position: "absolute",
                right: 0,
                top: 0,
              }}
            >
              <Button color="inherit" variant="outlined" size="small">
                Cancel Plan
              </Button>
              <Button color="primary" variant="outlined" size="small">
                Upgrade Plan
              </Button>
            </Box>
          </Box>
          <Typography variant="h4">{accountBilling.plan.name}</Typography>
        </Card>

        <Card sx={{ p: 24 }}>
          <Box display="flex" mb={24}>
            <Typography variant="overline" color="text-secondary" flexGrow={1}>
              PAYMENT METHOD
            </Typography>
            <AddPaymentDialog />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, minmax(10px, 1fr))",
                md: "repeat(2, minmax(10px, 1fr))",
              },
              gap: 16,
            }}
          >
            {accountBilling.cards.map((card) => (
              <BankingCard key={card.id} card={card} />
            ))}
          </Box>
        </Card>

        <Card sx={{ p: 24 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 24,
            }}
          >
            <Typography variant="overline" color="text-secondary">
              BILLING INFO
            </Typography>
            <Button startIcon={<PlusIcon />} size="small">
              New Billing Address
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {accountBilling.addresses.map((address, index) => (
              <React.Fragment key={address.id}>
                <SingleBill address={address} />
                {index !== accountBilling.addresses.length - 1 && (
                  <Divider variant="dashed" />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Typography
          component="p"
          variant="overline"
          color="text-secondary"
          mb={24}
        >
          Invoice History
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {accountBilling.invoices.map((invoice) => (
            <SingleInvoice key={invoice.id} invoice={invoice} />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

// ------------------ Payment Paper ------------------ //
const BankingCard: React.FC<{ card: IBillingBankCard }> = ({ card }) => {
  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 24 }}>
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
        <VerticalDotsIcon />
      </IconButton>

      <Box mb={8}>
        <img src={card.bankLogo} alt="bank" />
      </Box>
      <Typography variant="subtitle2">{card.number}</Typography>
    </Paper>
  );
};

// ------------------ Add Payment Dialog ------------------ //
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  number: yup.string().required("Card Number is required"),
  mmyy: yup.string().required("mm/yy is required"),
  cvv: yup.string().required("CVV is required"),
});

const AddPaymentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      mmyy: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        color="primary"
        startIcon={<PlusIcon />}
        size="small"
        onClick={handleOpen}
      >
        New Card
      </Button>
      <Dialog open={isOpen} onClose={handleClose} scroll="paper" maxWidth="xs">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle variant="h6">Add new card</DialogTitle>
          <DialogContent sx={{ pb: 0 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(10px, 1fr))",
                rowGap: 24,
                columnGap: 16,
                pt: 5,
              }}
            >
              <TextField
                label="Name on card"
                color="gray"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ gridColumn: "1/-1" }}
              />
              <TextField
                label="Card number"
                color="gray"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                error={formik.touched.number && Boolean(formik.errors.number)}
                helperText={formik.touched.number && formik.errors.number}
                sx={{ gridColumn: "1/-1" }}
              />
              <TextField
                label="MM/YY"
                color="gray"
                name="mmyy"
                value={formik.values.mmyy}
                onChange={formik.handleChange}
                error={formik.touched.mmyy && Boolean(formik.errors.mmyy)}
                helperText={formik.touched.mmyy && formik.errors.mmyy}
              />
              <TextField
                label="CVV"
                color="gray"
                name="cvv"
                value={formik.values.cvv}
                onChange={formik.handleChange}
                error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                helperText={formik.touched.cvv && formik.errors.cvv}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 24 }}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

// ------------------ Single Bill ------------------ //
const SingleBill: React.FC<{ address: IBillingAddress }> = ({ address }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography variant="subtitle2">{address.name}</Typography>
      <div>
        <Typography variant="body2" component="span" color="text-secondary">
          Address:
        </Typography>
        <Typography variant="body2" component="span">
          &nbsp;{address.address}
        </Typography>
      </div>
      <div>
        <Typography variant="body2" component="span" color="text-secondary">
          Phone:
        </Typography>
        <Typography variant="body2" component="span">
          &nbsp;{address.phone}
        </Typography>
      </div>
      <Box display="flex" gap={8}>
        <Button color="error" startIcon={<TrashIcon />} size="small">
          Delete
        </Button>
        <Button color="primary" startIcon={<PenIcon />} size="small">
          Edit
        </Button>
      </Box>
    </Box>
  );
};

// ------------------ Single Invoice ------------------ //
const SingleInvoice: React.FC<{
  invoice: IBillingInvoice;
}> = ({ invoice }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2">
        {format(invoice.date, "dd MMM yyyy")}
      </Typography>
      <Typography variant="body2">${invoice.price}</Typography>
      <Link underline="hover">PDF</Link>
    </Box>
  );
};

export default BillingTab;
