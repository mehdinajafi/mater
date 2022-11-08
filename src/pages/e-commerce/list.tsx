import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";

const ECommerceList = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 24,
          mt: 30,
          mb: 40,
        }}
      >
        <div>
          <Typography variant="h4" mb={8}>
            Product List
          </Typography>

          <Breadcrumbs
            aria-label="breadcrumb"
            separator={
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  bgcolor: "gray.500",
                }}
              />
            }
          >
            <Link
              to="/"
              component={RouterLink}
              variant="body2"
              color="text.primary"
              underline="hover"
            >
              Dashboard
            </Link>
            <Link
              to="/e-commerce"
              component={RouterLink}
              variant="body2"
              color="text.primary"
              underline="hover"
            >
              E-Commerce
            </Link>
            <Typography variant="body2" color="gray.500">
              List
            </Typography>
          </Breadcrumbs>
        </div>
        <Box flexShrink={0}>
          <Button
            variant="contained"
            startIcon={<PlusIcon width={20} height={20} />}
          >
            New Product
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default ECommerceList;
