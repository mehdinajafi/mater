import { Box, IconButton, styled } from "@mui/material";
import { ICarousel } from "./Carousel";
import { ReactComponent as ChevronRightIcon } from "@/assets/icons/chevron-right.svg";

interface ICarouselArrow {
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
  arrowPosition: ICarousel["arrowPosition"];
}

const SArrowsWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "arrowPosition",
})<{
  arrowPosition: ICarousel["arrowPosition"];
}>(({ arrowPosition }) => ({
  position: "absolute",
  top: 8,
  right: 8,

  ...(arrowPosition === "top-right" && {
    top: 8,
    right: 8,
  }),
}));

const CarouselArrows: React.FC<ICarouselArrow> = (props) => {
  return (
    <SArrowsWrapper arrowPosition={props.arrowPosition}>
      <IconButton
        onClick={props.handleNextSlide}
        className="carousel-arrow carousel-next"
        sx={{
          color: "#fff",
          opacity: 0.48,
          "& svg": {
            transform: "scaleX(-1)",
          },
        }}
      >
        <ChevronRightIcon width={20} height={20} />
      </IconButton>
      <IconButton
        onClick={props.handlePrevSlide}
        className="carousel-arrow carousel-prev"
        sx={{
          color: "#fff",
          opacity: 0.48,
        }}
      >
        <ChevronRightIcon width={20} height={20} />
      </IconButton>
    </SArrowsWrapper>
  );
};

export default CarouselArrows;
