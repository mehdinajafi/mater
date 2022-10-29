import { Button, Card, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ReactComponent as FacebookIcon } from "@/assets/icons/social/facebook.svg";
import { ReactComponent as InstagramIcon } from "@/assets/icons/social/instagram.svg";
import { ReactComponent as LinkedinIcon } from "@/assets/icons/social/linkedin.svg";
import { ReactComponent as TwitterIcon } from "@/assets/icons/social/twitter.svg";

const SocialLinksTab = () => {
  const formik = useFormik({
    initialValues: {
      facebook: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
    onSubmit: (values, helpers) => {
      setTimeout(() => {
        helpers.setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={{ p: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <TextField
          name="facebook"
          color="gray"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "gray.600" }}>
                <FacebookIcon width={24} height={24} />
              </InputAdornment>
            ),
          }}
          value={formik.values.facebook}
          onChange={formik.handleChange}
        />
        <TextField
          name="instagram"
          color="gray"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "gray.600" }}>
                <InstagramIcon width={24} height={24} />
              </InputAdornment>
            ),
          }}
          value={formik.values.instagram}
          onChange={formik.handleChange}
        />
        <TextField
          name="linkedin"
          color="gray"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "gray.600" }}>
                <LinkedinIcon width={24} height={24} />
              </InputAdornment>
            ),
          }}
          value={formik.values.linkedin}
          onChange={formik.handleChange}
        />
        <TextField
          name="twitter"
          color="gray"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "gray.600" }}>
                <TwitterIcon width={24} height={24} />
              </InputAdornment>
            ),
          }}
          value={formik.values.twitter}
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ ml: "auto" }}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Saving Changes" : "Save Changes"}
        </Button>
      </Card>
    </form>
  );
};

export default SocialLinksTab;
