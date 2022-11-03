import React, { useState } from "react";
import { Box, Button, Card, Fab, InputBase, Typography } from "@mui/material";
import { ReactComponent as MediaIcon } from "@/assets/icons/media.svg";

const NewPostForm = () => {
  const [post, setPost] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const isPostHaveValue = post.trim().length !== 0;

  const handlePostOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(e.target.value);
  };

  const handlePosting = () => {
    setIsPosting(true);

    setTimeout(() => {
      setIsPosting(false);
    }, 3000);
  };

  return (
    <Card sx={{ p: 24 }}>
      <Box>
        <InputBase
          multiline
          name="post"
          rows={4}
          placeholder="Share what you are thinking here..."
          value={post}
          onChange={handlePostOnChange}
          sx={{
            width: "100%",
            p: "1rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(145, 158, 171, 0.32)",
          }}
        />

        <Box sx={{ display: "flex", alignItems: "center", mt: 24 }}>
          <Fab
            component="label"
            htmlFor="post-attachment"
            variant="extended"
            size="small"
            color="inherit"
            sx={{
              boxShadow: "none",
              bgcolor: "action.hover",
              textTransform: "none",
              "&:active": {
                boxShadow: "none",
              },
            }}
          >
            <Box
              component={MediaIcon}
              sx={(theme) => ({
                width: 24,
                height: 24,
                color: theme.palette.success.main,
                mr: 16,
              })}
            />
            <Typography
              component="span"
              variant="body2"
              color="text-secondary"
              fontWeight={700}
            >
              Image/Video
            </Typography>
          </Fab>

          <input type="file" id="post-attachment" style={{ display: "none" }} />

          <Button
            type="submit"
            variant="contained"
            disabled={!isPostHaveValue || isPosting}
            onClick={handlePosting}
            sx={{ ml: "auto" }}
          >
            {isPosting ? "Posting" : "Post"}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default NewPostForm;
