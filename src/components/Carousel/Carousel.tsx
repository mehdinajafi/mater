import { Box, styled } from "@mui/material";
import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselArrows from "./CarouselArrows";
import CarouselItem from "./CarouselItem";

export interface ICarousel {
  children: React.ReactNode;
  arrowPosition: "top-right";
  dotsPosition: "top-left";
}

const SWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "dotsPosition",
})<{
  dotsPosition: ICarousel["dotsPosition"];
}>(({ theme, dotsPosition }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: theme.borderRadius["2xl"],

  "& .slick-dots": {
    position: "absolute",
    width: "max-content",
    ...(dotsPosition === "top-left" && {
      top: 12,
      left: 20,
      bottom: "unset",
    }),

    "& li": {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      opacity: 0.32,
      margin: 0,
      color: theme.palette.primary.main,
      "&.slick-active": {
        opacity: 1,
      },
    },
  },
}));

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  customPaging: () => (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "currentColor",
          transition: "width 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        }}
      />
    </Box>
  ),
};

const Carousel: React.FC<ICarousel> = (props) => {
  const sliderRef = useRef<any>();
  const nextSlice = () => {
    sliderRef.current.slickNext();
  };
  const prevSlice = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <SWrapper dotsPosition={props.dotsPosition}>
      <Slider ref={(c) => (sliderRef.current = c)} {...settings}>
        {props.children}
      </Slider>

      <CarouselArrows
        arrowPosition={props.arrowPosition}
        handleNextSlide={nextSlice}
        handlePrevSlide={prevSlice}
      />
    </SWrapper>
  );
};

export default Object.assign(Carousel, {
  Item: CarouselItem,
});
