import { CircularProgress, Stack } from "@mui/material";

const DropdownLoading = () => {
  return (
    <Stack alignItems="center" py={50}>
      <CircularProgress size={30} />
    </Stack>
  );
};

export default DropdownLoading;
