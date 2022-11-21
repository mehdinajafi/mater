import { Button, InputAdornment, TextField } from "@mui/material";

const OrderSummeryDiscountForm = () => {
  const applyDiscountCode = () => {
    // ...
  };

  return (
    <form>
      <TextField
        placeholder="Dicount Code"
        color="gray"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button size="small" onClick={applyDiscountCode}>
                Apply
              </Button>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default OrderSummeryDiscountForm;
