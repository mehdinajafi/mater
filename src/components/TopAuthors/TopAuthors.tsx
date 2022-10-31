import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { ReactComponent as HeartIcon } from "@/assets/icons/heart.svg";
import { ReactComponent as TrophyIcon } from "@/assets/icons/trophy.svg";
import kFormatter from "@/utils/kFormatter";
import IAuthor from "@/types/interfaces/author";

type Author = { likes: number } & IAuthor;
interface ITopAuthors {
  authors: Author[];
}

const colors = ["primary", "info", "error"];

const TopAuthors: React.FC<ITopAuthors> = ({ authors }) => {
  return (
    <Card>
      <CardHeader title="Top Authors" sx={{ pb: 0 }} />

      <Box
        sx={{
          p: 24,
          overflowX: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {authors.map((author, index) => (
          <Box
            key={author.name}
            sx={{ display: "flex", alignItems: "center", gap: 16 }}
          >
            <Avatar src={author.avatar} alt="avatar" sx={{ flexShrink: 0 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{author.name}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  mt: 4,
                  color: "gray.600",
                  "& svg": {
                    flexShrink: 0,
                  },
                }}
              >
                <HeartIcon />
                <Typography variant="caption">
                  {kFormatter(author.likes)}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: `${colors[index]}.semiTransparent`,
                color: `${colors[index]}.main`,
                borderRadius: "50%",
                width: 40,
                height: 40,
                p: 8,
              }}
            >
              <TrophyIcon width="100%" height="100%" />
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default TopAuthors;
