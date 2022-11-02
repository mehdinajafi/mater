import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReactComponent as ChevronDownIcon } from "@/assets/icons/chevron-down.svg";
import { ReactComponent as CameraPlusIcon } from "@/assets/icons/camera-plus.svg";
import ICurrentUser from "@/types/interfaces/currentUser";

interface IAccountGeneralTab {
  currentUser: ICurrentUser;
}

const SAvatarWrapper = styled("label")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 144,
  height: 144,
  borderRadius: "50%",
  border: "1px dashed rgba(145, 158, 171, 0.32)",
  position: "relative",
  cursor: "pointer",
});

const SAvatarPlaceHolder = styled("div")(({ theme }) => ({
  backgroundColor: "rgba(22, 28, 36, 0.64)",
  color: "#fff",
  width: "calc(100% - 1rem)",
  height: "calc(100% - 1rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  opacity: 0,
  borderRadius: theme.borderRadius.full,
  [`.avatar-upload-wrapper:hover &`]: {
    opacity: 1,
  },
}));

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const AccountGeneralTab: React.FC<IAccountGeneralTab> = ({ currentUser }) => {
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      phoneNumber: currentUser?.phoneNumber,
      address: currentUser?.address,
      country: currentUser?.countryCode,
      state: currentUser?.region,
      city: currentUser?.city,
      zipCode: currentUser?.zipcode,
      about: currentUser?.bio,
      publicAccount: currentUser?.publicAccount,
    },
    validationSchema,
    onSubmit: (values, helpers) => {
      helpers.setSubmitting(true);
      setTimeout(() => {
        helpers.setSubmitting(false);
      }, 3000);
    },
  });

  const handleAvatarOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const img = files[0];
      formik.handleChange(e);
      setAvatarFile(img);
      setAvatarUrl(URL.createObjectURL(img));
    }
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                py: 80,
                px: 24,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SAvatarWrapper
                htmlFor="upload-avatar"
                className="avatar-upload-wrapper"
              >
                <input
                  id="upload-avatar"
                  name="avatar"
                  accept="image/*"
                  type="file"
                  tabIndex={-1}
                  style={{ display: "none" }}
                  onChange={handleAvatarOnChange}
                />

                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    width: "calc(100% - 1rem)",
                    height: "calc(100% - 1rem)",
                    "& img": {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                >
                  <img src={avatarUrl} alt="avatar" />
                </Box>

                <SAvatarPlaceHolder className="avatar-plceholder">
                  <CameraPlusIcon width={24} height={24} />
                  <Typography variant="caption" mt={8}>
                    Update photo
                  </Typography>
                </SAvatarPlaceHolder>
              </SAvatarWrapper>

              <Typography
                variant="caption"
                sx={{ mt: 16, textAlign: "center", color: "gray.600" }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br />
                max size of 3.1 MB
              </Typography>

              <FormControlLabel
                label={
                  <Typography variant="body2" mr={12}>
                    Public Profile
                  </Typography>
                }
                control={
                  <Switch
                    name="publicAccount"
                    checked={formik.values.publicAccount}
                    onChange={formik.handleChange}
                  />
                }
                labelPlacement="start"
                sx={{ mr: 11, mt: 40 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 24 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, minmax(10px, 1fr))",
                    md: "repeat(2, minmax(10px, 1fr))",
                  },
                  rowGap: 24,
                  columnGap: 16,
                }}
              >
                <TextField
                  label="Name"
                  color="gray"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  label="Email Address"
                  color="gray"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  label="Phone Number"
                  color="gray"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
                <TextField
                  label="Address"
                  color="gray"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                  label="Country"
                  select
                  SelectProps={{
                    native: true,
                    IconComponent: ChevronDownIcon,
                  }}
                  color="gray"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                >
                  <option value="ir">Iran</option>
                </TextField>
                <TextField
                  label="State/Region"
                  color="gray"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
                <TextField
                  label="City"
                  color="gray"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                />
                <TextField
                  label="Zip/Code"
                  color="gray"
                  name="zipCode"
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                />
                <TextField
                  label="About"
                  multiline
                  rows={4}
                  sx={{ gridColumn: "1/-1" }}
                  color="gray"
                  name="about"
                  value={formik.values.about}
                  onChange={formik.handleChange}
                  error={formik.touched.about && Boolean(formik.errors.about)}
                  helperText={formik.touched.about && formik.errors.about}
                />
                <Box sx={{ gridColumn: "1/-1", textAlign: "end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Saving Changes" : "Save Changes"}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AccountGeneralTab;
