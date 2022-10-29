import {
  Box,
  Button,
  Card,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";

const NotificationsTab = () => {
  const formik = useFormik({
    initialValues: {
      activityComments: true,
      activityAnsware: false,
      activityFollow: false,
      applicationNews: true,
      applicationProduct: false,
      applicationBlog: false,
    },
    onSubmit: (values, helpers) => {
      setTimeout(() => {
        helpers.setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <Card sx={{ p: 24 }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div>
          <Typography variant="overline" component="div" color="text-secondary">
            Activity
          </Typography>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 8, mt: 16 }}
          >
            <FormControlLabel
              control={
                <Switch
                  name="activityComments"
                  checked={formik.values.activityComments}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">
                  Email me when someone comments onmy article
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  name="activityAnsware"
                  checked={formik.values.activityAnsware}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">
                  Email me when someone answers on my form
                </Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  name="activityFollow"
                  checked={formik.values.activityFollow}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">
                  Email me hen someone follows me
                </Typography>
              }
            />
          </Box>
        </div>

        <div>
          <Typography variant="overline" component="div" color="text-secondary">
            Application
          </Typography>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 8, mt: 16 }}
          >
            <FormControlLabel
              control={
                <Switch
                  name="applicationNews"
                  checked={formik.values.applicationNews}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">News and announcements</Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  name="applicationProduct"
                  checked={formik.values.applicationProduct}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">Weekly product updates</Typography>
              }
            />
            <FormControlLabel
              control={
                <Switch
                  name="applicationBlog"
                  checked={formik.values.applicationBlog}
                  onChange={formik.handleChange}
                />
              }
              label={
                <Typography variant="body2">Weekly blog digest</Typography>
              }
            />
          </Box>
        </div>

        <Box textAlign="end">
          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Saving Changes" : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default NotificationsTab;
