import {
  Box,
  Typography,
  Link,
  TextField,
  Stack,
  Button,
  Divider,
  IconButton,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link as RouterLink } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "@/assets/icons/companies/google.svg";
import { ReactComponent as GithubIcon } from "@/assets/icons/companies/github.svg";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { ReactComponent as InfoIcon } from "@/assets/icons/info.svg";

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

const AuthLoginPage = () => {
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 480,
          px: { xs: 20, md: 64 },
          py: 24,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box mb={24}>
          <LogoIcon width={40} height={40} />
        </Box>

        <Typography variant="h4" mb={8}>
          Welcome back
        </Typography>

        <Box mb={40}>
          <Typography component="span" variant="body2">
            New user?
          </Typography>
          &nbsp;
          <Link
            component={RouterLink}
            variant="body2"
            underline="hover"
            to="/auth/register"
            fontWeight={600}
          >
            Create an account
          </Link>
        </Box>

        <Alert
          severity="info"
          icon={<InfoIcon width={24} height={24} />}
          sx={{ mb: 24 }}
        >
          Use email : <strong>demo@minimals.cc</strong> / password :{" "}
          <strong>demo1234</strong>
        </Alert>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={16}>
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
            <Link variant="body2" color="inherit" textAlign="end">
              Forgot password?
            </Link>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="dark"
              disableElevation
            >
              Login
            </Button>
          </Stack>
        </form>

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

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#F1F2F7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            bottom: 0,
            right: 0,
            left: 480,
          }}
        >
          <Box
            component="img"
            src="/assets/illustrations/dashboard.png"
            alt="auth"
            sx={{ maxHeight: "100%" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLoginPage;
