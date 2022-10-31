import { useRef } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import IPost from "@/types/interfaces/post";
import IComment from "@/types/interfaces/comment";
import ICurrentUser from "@/types/interfaces/currentUser";
import { ReactComponent as VerticalDotsIcon } from "@/assets/icons/dots-vertical.svg";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as CommentSolidIcon } from "@/assets/icons/comment-solid.svg";
import { ReactComponent as ShareIcon } from "@/assets/icons/share.svg";
import { ReactComponent as EmojiIcon } from "@/assets/icons/emoji.svg";
import { ReactComponent as MediaPlusSolidIcon } from "@/assets/icons/media-plus-solid.svg";
import { nanoid } from "nanoid";

interface ISingleProfilePost {
  post: IPost;
}

const SingleProfilePost: React.FC<ISingleProfilePost> = ({ post }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar src={post.author.avatar} alt={post.author.name} />}
        title={post.author.name}
        subheader={format(post.date, "dd MMM yyyy")}
        action={
          <IconButton>
            <VerticalDotsIcon width={20} height={20} />
          </IconButton>
        }
      />

      <Typography variant="body1" p={24} pb={16}>
        Assumenda nam repudiandae rerum fugiat vel maxime.
      </Typography>

      <Box
        sx={{
          position: "relative",
          borderRadius: "0.5rem",
          overflow: "hidden",
          paddingTop: "56.25%",
          margin: 8,
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          },
        }}
      >
        <img src={post.image} alt="" loading="lazy" />
      </Box>

      <Box sx={{ p: 24, pt: 16, display: "flex", alignItems: "center" }}>
        <FormControlLabel
          label={<Typography variant="body2">{post.totalLikes}</Typography>}
          control={
            <Checkbox
              color="error"
              defaultChecked
              icon={<HeartIcon width={24} height={24} />}
              checkedIcon={<HeartIcon width={24} height={24} />}
            />
          }
          sx={{ mr: 16 }}
        />

        <AvatarGroup
          max={3}
          total={post.totalLikes}
          sx={{
            "& .MuiAvatarGroup-avatar": {
              height: 32,
              width: 32,
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "rgb(0, 171, 85)",
              backgroundColor: "rgb(200, 250, 205)",
            },
          }}
        >
          {post.likes.map((user) => (
            <Avatar
              key={user.name}
              src={user.avatar}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          ))}
        </AvatarGroup>

        <IconButton sx={{ ml: "auto" }}>
          <CommentSolidIcon width={20} height={20} />
        </IconButton>
        <IconButton>
          <ShareIcon width={20} height={20} />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          px: 24,
          pb: 16,
        }}
      >
        {post.comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </Box>

      <Box sx={{ px: 24, pb: 24 }}>
        <NewCommentForm
          currentUser={{
            id: nanoid(),
            name: "Mehdi Najafi",
            avatar:
              "https://www.dropbox.com/s/iv3vsr5k6ib2pqx/avatar_default.jpg?dl=1",
          }}
        />
      </Box>
    </Card>
  );
};

// -------------------------- Comment -------------------------- //
interface ISingleComment {
  comment: IComment;
}

const SingleComment: React.FC<ISingleComment> = ({ comment }) => {
  return (
    <Box sx={{ display: "flex", gap: 16 }}>
      <Box flexShrink={0}>
        <Avatar src={comment.author.avatar} alt={comment.author.name} />
      </Box>
      <Box
        sx={{ p: 12, borderRadius: "0.5rem", bgcolor: "gray.200", flexGrow: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">{comment.author.name}</Typography>
          <Typography variant="caption" color="gray.500">
            {format(comment.date, "dd MMM yyyy")}
          </Typography>
        </Box>
        <Typography variant="body2" color="text-secondary">
          {comment.body}
        </Typography>
      </Box>
    </Box>
  );
};

// -------------------------- New Comment Form -------------------------- //
interface INewCommentForm {
  currentUser: ICurrentUser;
}

const NewCommentForm: React.FC<INewCommentForm> = ({ currentUser }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addMediaOnClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ display: "flex", gap: 16 }}>
      <Box flexShrink={0}>
        <Avatar src={currentUser.avatar} alt={currentUser.name} />
      </Box>

      <InputBase
        placeholder="Write a comment..."
        endAdornment={
          <Box sx={{ display: "flex" }}>
            <IconButton size="small" onClick={addMediaOnClick}>
              <MediaPlusSolidIcon width={20} height={20} />
            </IconButton>
            <IconButton size="small">
              <EmojiIcon width={20} height={20} />
            </IconButton>
          </Box>
        }
        sx={{
          border: "1px solid rgba(145, 158, 171, 0.32)",
          borderRadius: "0.5rem",
          flexGrow: 1,
          px: 12,
          "& input": {
            py: 4,
          },
        }}
      />

      <input type="file" ref={fileInputRef} style={{ display: "none" }} />
    </Box>
  );
};

export default SingleProfilePost;
