import { useState } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { ReactComponent as BellRingingIcon } from "@/assets/icons/bell-ringing.svg";

const ProductNotAvailableBox = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [notifyBtnLoading, setNotifyBtnLoading] = useState(false);

  const handleNotify = () => {
    setNotifyBtnLoading(true);
    setTimeout(() => {
      setNotifyBtnLoading(false);
      enqueueSnackbar("We will notify you", { variant: "success" });
    }, 2000);
  };

  return (
    <Paper variant="outlined" sx={{ p: 16, maxWidth: 350 }}>
      <Typography variant="body1" mb={16}>
        This product is currently not available, but you can ring the bell and
        we will notify you as soon as it is available
      </Typography>
      <Button
        variant="contained"
        startIcon={<BellRingingIcon width={20} height={20} />}
        disabled={notifyBtnLoading}
        onClick={handleNotify}
      >
        Notify me
      </Button>
    </Paper>
  );
};

export default ProductNotAvailableBox;
