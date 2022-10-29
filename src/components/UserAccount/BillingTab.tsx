import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
  TextField,
  Typography,
} from "@mui/material";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";
import { ReactComponent as VerticalDotsIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as TrashIcon } from "@/assets/icons/trash.svg";
import { ReactComponent as PenIcon } from "@/assets/icons/pen.svg";

const BillingTab = () => {
  return (
    <Box>
      <Grid container spacing={40}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 24 }}>
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
              <Typography variant="h4">Premium</Typography>
            </Card>

            <Card sx={{ p: 24 }}>
              <Box display="flex" mb={24}>
                <Typography
                  variant="overline"
                  color="text-secondary"
                  flexGrow={1}
                >
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
                <PaymentPaper />
                <PaymentPaper />
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
                <SingleBill />
                <Divider variant="dashed" />
                <SingleBill />
              </Box>
            </Card>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box mb={24}>
            <Typography variant="overline" color="text-secondary">
              Invoice History
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SingleInvoice />
            <SingleInvoice />
            <SingleInvoice />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// ------------------ Payment Paper ------------------ //
const PaymentPaper = () => {
  return (
    <Paper variant="outlined" elevation={0} sx={{ p: 24 }}>
      <IconButton sx={{ position: "absolute", top: 8, right: 8 }}>
        <VerticalDotsIcon />
      </IconButton>

      <Box mb={8}>
        <img src="/assets/icons/payments/mastercard.svg" />
      </Box>
      <Typography variant="subtitle2">**** **** **** 1234</Typography>
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
const SingleBill = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Typography variant="subtitle2">Jayvion Simon</Typography>
      <Box>
        <Typography variant="body2" component="span" color="text-secondary">
          Address:
        </Typography>
        <Typography variant="body2" component="span">
          &nbsp;41256 Kamille Turnpike, East Sambury, New Hampshire, Kenya 85807
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" component="span" color="text-secondary">
          Phone:
        </Typography>
        <Typography variant="body2" component="span">
          &nbsp;365-374-4961
        </Typography>
      </Box>
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
const SingleInvoice = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2">29 Oct 2022</Typography>
      <Typography variant="body2">$16.19</Typography>
      <Link underline="hover">PDF</Link>
    </Box>
  );
};

export default BillingTab;
