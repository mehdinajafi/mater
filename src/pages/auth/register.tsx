import {
  Box,
  Typography,
  Link,
  TextField,
  Stack,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { ReactComponent as GoogleIcon } from "@/assets/icons/companies/google.svg";
import { ReactComponent as GithubIcon } from "@/assets/icons/companies/github.svg";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be minimum 8+")
    .required("Password is required"),
});

const AuthRegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <Box>
      <Box mb={24}>
        <Logo />
      </Box>

      <Typography variant="h4" mb={8}>
        Welcome
      </Typography>

      <Box mb={40}>
        <Typography component="span" variant="body2">
          Already have an account?
        </Typography>
        &nbsp;
        <Link
          component={RouterLink}
          variant="body2"
          underline="hover"
          to="/auth/login"
          fontWeight={600}
        >
          Sign in
        </Link>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={16}>
          <Box display="flex" gap={16}>
            <TextField
              name="firstName"
              label="First name"
              color="gray"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched && Boolean(formik.errors.firstName)}
              helperText={formik.touched && formik.errors.firstName}
            />
            <TextField
              name="lastName"
              label="Last name"
              color="gray"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched && Boolean(formik.errors.lastName)}
              helperText={formik.touched && formik.errors.lastName}
            />
          </Box>
          <TextField
            name="email"
            label="Email address"
            color="gray"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched && Boolean(formik.errors.email)}
            helperText={formik.touched && formik.errors.email}
          />
          <TextField
            name="password"
            label="Password"
            color="gray"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched && Boolean(formik.errors.password)}
            helperText={formik.touched && formik.errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="dark"
            disableElevation
          >
            Create Account
          </Button>
        </Stack>
      </form>

      <Typography
        component="p"
        variant="caption"
        color="text-secondary"
        mt={16}
      >
        By signing up, I agree to <Link color="gray.800">Terms of Service</Link>{" "}
        and <Link color="gray.800">Privacy Policy</Link>.
      </Typography>

      <Divider
        variant="dashed"
        sx={{
          my: 20,
          color: "gray.600",
          alignItems: "flex-start",
          fontSize: "0.75rem",
          lineHeight: 1.5,
          "& .MuiDivider-wrapper": {
            px: 9.6,
          },
        }}
      >
        OR
      </Divider>

      <Box display="flex" justifyContent="center" gap={16}>
        <IconButton>
          <GoogleIcon width={20} height={20} />
        </IconButton>
        <IconButton>
          <GithubIcon width={20} height={20} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AuthRegisterPage;
