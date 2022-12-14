import { Button, Card, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReactComponent as InfoIcon } from "@/assets/icons/info.svg";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .min(8, "Password must be minimum 8+")
    .required("Old Password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be minimum 8+")
    .required("New Password required"),
  repeatNewPassword: yup
    .string()
    .min(8, "Password must be minimum 8+")
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password required"),
});

const ChangePasswordTab = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema,
    onSubmit: (values, helpers) => {
      setTimeout(() => {
        helpers.setSubmitting(false);
      }, 2000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ p: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <TextField
          type="password"
          color="gray"
          name="oldPassword"
          label="Old Password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
          }
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
          type="password"
          color="gray"
          name="newPassword"
          label="New Password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          helperText={
            <Stack component="span" direction="row" spacing={4} mt={5}>
              <InfoIcon width={16} height={16} />
              <span>
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : "Password must be minimum 8+"}
              </span>
            </Stack>
          }
        />
        <TextField
          type="password"
          color="gray"
          name="repeatNewPassword"
          label="Confirm New Password"
          value={formik.values.repeatNewPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.repeatNewPassword &&
            Boolean(formik.errors.repeatNewPassword)
          }
          helperText={
            formik.touched.repeatNewPassword && formik.errors.repeatNewPassword
          }
        />
        <Button
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
          sx={{ ml: "auto" }}
        >
          {formik.isSubmitting ? "Saving Changes" : "Save Changes"}
        </Button>
      </Card>
    </form>
  );
};

export default ChangePasswordTab;
