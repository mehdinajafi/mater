import { Box, IconButton, styled, Typography } from "@mui/material";
import { ICarousel } from "./Carousel";
import { ReactComponent as ChevronRightIcon } from "@/assets/icons/chevron-right.svg";

interface ICarouselArrow {
  handleNextSlide: () => void;
  handlePrevSlide: () => void;
  arrowPosition: ICarousel["arrowPosition"];
  counterText?: string;
}

const SArrowsWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "arrowPosition" && prop !== "hasCounter",
})<{
  arrowPosition: ICarouselArrow["arrowPosition"];
  hasCounter: boolean;
}>(({ arrowPosition, hasCounter, theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "absolute",

  ...(arrowPosition === "top-right" && {
    top: 8,
    right: 8,
  }),
  ...(arrowPosition === "bottom-right" && {
    bottom: 8,
    right: 8,
  }),
  ...(hasCounter && {
    backgroundColor: "rgba(22, 28, 36, 0.48)",
    backdropFilter: "blur(6px)",
    borderRadius: theme.borderRadius.lg,
  }),
}));

const CarouselArrows: React.FC<ICarouselArrow> = (props) => {
  return (
    <SArrowsWrapper
      hasCounter={Boolean(props.counterText)}
      arrowPosition={props.arrowPosition}
    >
      <IconButton
        onClick={props.handlePrevSlide}
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
      {props.counterText && (
        <Typography variant="subtitle2" color="#ffffff" mx={2}>
          {props.counterText}
        </Typography>
      )}
      <IconButton
        onClick={props.handleNextSlide}
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
