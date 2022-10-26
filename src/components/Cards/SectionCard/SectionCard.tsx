import { Box, styled } from "@mui/material";

const SectionCard = styled(Box)(({ theme }) => ({
  boxShadow: theme.customShadows.card,
  borderRadius: theme.borderRadius["2xl"],
}));

export default SectionCard;
