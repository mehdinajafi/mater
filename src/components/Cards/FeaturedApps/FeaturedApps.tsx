import { Box, Card, Typography } from "@mui/material";
import Carousel from "@/components/ui/Carousel";
import Cover1Img from "@/assets/images/covers/cover_1.jpeg";
import Cover2Img from "@/assets/images/covers/cover_2.jpeg";
import Cover3Img from "@/assets/images/covers/cover_3.jpeg";

const FeaturedApps = () => {
  return (
    <Card>
      <Carousel
        autoplay
        speed={400}
        arrowPosition="top-right"
        dotsPosition="top-left"
      >
        <Carousel.Item>
          <Slide
            img={Cover1Img}
            title="Harry Potter and the Deathly Hallows - Part 2"
            des="Apply These 7 Secret Techniques To Improve Event"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Slide
            img={Cover2Img}
            title="Disney Zombies 2"
            des="Believing These 7 Myths About Event Keeps You From Growing"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Slide
            img={Cover3Img}
            title="Lightroom mobile - Koloro"
            des="Don't Waste Time! 7 Facts Until You Reach Your Event"
          />
        </Carousel.Item>
      </Carousel>
    </Card>
  );
};

// ------------------------- Slide ------------------------- //
interface ISlide {
  img: string;
  title: string;
  des: string;
}

const Slide: React.FC<ISlide> = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: 280,
      }}
    >
      <Box
        sx={{
          height: "100%",
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
          },
        }}
      >
        <img src={props.img} alt={props.title} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(22, 28, 36, 0.64)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          p: 24,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
          color: "#fff",
        }}
      >
        <Typography variant="overline" noWrap sx={{ opacity: 0.48 }}>
          Featured App
        </Typography>
        <Typography variant="h5" noWrap>
          {props.title}
        </Typography>
        <Typography variant="body2" noWrap>
          {props.des}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeaturedApps;
