import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Kanban from "@/components/Kanban";

const KanbanPage = () => {
  return (
    <div>
      <Box mt={30} mb={40}>
        <Typography variant="h4" mb={8}>
          Kanban
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
          <Typography variant="body2" color="gray.500">
            Kanban
          </Typography>
        </Breadcrumbs>
      </Box>

      <Kanban />
    </div>
  );
};

export default KanbanPage;
