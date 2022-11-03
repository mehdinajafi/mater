import { Box, Card, IconButton, Skeleton, Typography } from "@mui/material";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import getProfileGallery from "@/api/profile/getProfileGallery";
import { ReactComponent as DotsVerticalIcon } from "@/assets/icons/dots-vertical.svg";

interface IImage {
  id: string;
  title: string;
  src: string;
  published: number;
}

const GalleryTab = () => {
  const {
    data: images,
    isLoading,
    isError,
  } = useQuery<IImage[]>(["profile-gallery"], getProfileGallery);

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const renderSkeleton = () => {
    return (
      <>
        <Skeleton variant="rounded" sx={{ paddingTop: "100%" }} />
        <Skeleton variant="rounded" sx={{ paddingTop: "100%" }} />
        <Skeleton variant="rounded" sx={{ paddingTop: "100%" }} />
      </>
    );
  };

  return (
    <div>
      <Typography variant="h4" my={40}>
        Gallery
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, minmax(10px, 1fr))",
            sm: "repeat(2, minmax(10px, 1fr))",
            md: "repeat(3, minmax(10px, 1fr))",
          },
          gap: 24,
        }}
      >
        {isLoading
          ? renderSkeleton()
          : images.map((image) => <ImageCard key={image.id} image={image} />)}
      </Box>
    </div>
  );
};

// ------------------- Image Card ------------------- //
interface IImageCard {
  image: IImage;
}

const ImageCard: React.FC<IImageCard> = ({ image }) => {
  return (
    <Card sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          paddingTop: "100%",
          "& img": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <img src={image.src} alt={image.title} loading="lazy" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          py: 24,
          pl: 24,
          pr: 8,
          backgroundColor: "rgba(22, 28, 36, 0.8)",
          color: "#ffffff",
          backdropFilter: "blur(6px)",
        }}
      >
        <Box>
          <Typography component="h6" variant="subtitle2">
            {image.title}
          </Typography>
          <Typography variant="body2" mt={8} sx={{ opacity: 0.72 }}>
            {format(image.published, "dd MMM yyyy")}
          </Typography>
        </Box>
        <IconButton sx={{ flexShrink: 0, color: "#ffffff" }}>
          <DotsVerticalIcon width={20} height={20} />
        </IconButton>
      </Box>
    </Card>
  );
};

export default GalleryTab;
