import { Box, Stack } from "@mui/material";

interface IPageHeader {
  children: React.ReactNode;
  actions?: React.ReactNode[];
}

const PageHeader: React.FC<IPageHeader> = (props) => {
  if (props.actions) {
    return (
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        spacing={24}
        mt={30}
        mb={40}
      >
        <div>{props.children}</div>
        <Stack flexDirection="row" spacing={8} flexShrink={0}>
          {props.actions}
        </Stack>
      </Stack>
    );
  }

  return (
    <Box mt={30} mb={40}>
      {props.children}
    </Box>
  );
};

export default PageHeader;
