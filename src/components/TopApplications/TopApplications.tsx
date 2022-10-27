import { Box, Card, CardHeader } from "@mui/material";
import IApplication from "@/types/interfaces/application";
import ApplicationRow from "./ApplicationRow";

interface ITopApplications {
  applications: IApplication[];
}

const TopApplications: React.FC<ITopApplications> = ({ applications }) => {
  return (
    <Card>
      <CardHeader title="Top Related Applications" sx={{ p: 24, pb: 0 }} />
      <Box
        sx={{
          py: 24,
          pl: 24,
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {applications.map((application) => (
          <ApplicationRow key={application.id} application={application} />
        ))}
      </Box>
    </Card>
  );
};

export default TopApplications;
