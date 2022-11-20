import React, { useRef, useState } from "react";
import { Box, styled, Tab, Tabs } from "@mui/material";
import Slider, { Settings } from "react-slick";
import CarouselArrows from "./CarouselArrows";
import CarouselItem from "./CarouselItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface ICarousel {
  children: React.ReactNode;
  arrowPosition?: "top-right" | "bottom-right";
  dotsPosition?: "top-left";
  disableDots?: boolean;
  thumbs?: string[];
  withCounter?: boolean;
}

const SSlickDots = styled("ul")<{
  dotsPosition: ICarousel["dotsPosition"];
}>(({ dotsPosition }) => ({
  position: "absolute",
  width: "max-content",
  margin: 0,
  padding: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",

  ...(dotsPosition === "top-left" && {
    top: 12,
    left: 20,
    bottom: "unset",
  }),

  "& > li": {
    margin: 0,
    width: "max-content",
    height: "max-content",
  },
}));

const SDot = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 18,
  height: 18,
  margin: 0,
  transition: "width 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",

  ".slick-dots li &": {
    opacity: 0.32,
  },
  ".slick-dots li.slick-active &": {
    opacity: 1,
  },

  "&:after": {
    content: "' '",
    width: 8,
    height: 8,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
  },
}));

const SThumb = styled("div")<{ active: boolean }>(({ theme, active }) => ({
  position: "relative",
  flexShrink: 0,
  backgroundColor: "transparent",
  padding: 0,
  width: 64,
  height: 64,
  overflow: "hidden",
  cursor: "pointer",
  borderRadius: theme.borderRadius.xl,
  border: "2px solid transparent",
  opacity: 0.48,

  ...(active && {
    opacity: 1,
    border: `2px solid ${theme.palette.primary.main}`,
  }),

  "& > img": {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    objectFit: "cover",
  },
}));

const Carousel: React.FC<ICarousel> = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const childrenLength = React.Children.toArray(props.children).length;
  const sliderRef = useRef<any>();

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange(slide, next) {
      setCurrentSlide(next);
    },
    appendDots: (dots: React.ReactNode[]) => {
      return <SSlickDots dotsPosition={props.dotsPosition}>{dots}</SSlickDots>;
    },
    customPaging: () => {
      return <div>{!props.disableDots && <SDot />}</div>;
    },
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const goToSlide = (index: number) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          "& .slick-slide": {
            overflow: "hidden",
            borderRadius: "0.75rem",
          },
        }}
      >
        <Slider ref={(c) => (sliderRef.current = c)} {...settings}>
          {props.children}
        </Slider>

        <CarouselArrows
          arrowPosition={props.arrowPosition}
          handleNextSlide={goToNextSlide}
          handlePrevSlide={goToPrevSlide}
          counterText={
            props.withCounter ? `${currentSlide + 1}/${childrenLength}` : ""
          }
        />
      </Box>

      {props.thumbs && (
        <Tabs
          value={currentSlide}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mt: 16,
            "& .MuiTabs-flexContainer": { gap: 2 },
            "& .MuiTabs-indicator": { display: "none" },
          }}
        >
          {props.thumbs.map((thumb, index) => (
            <Tab
              key={thumb}
              value={index}
              label={
                <SThumb
                  active={currentSlide === index}
                  onClick={() => goToSlide(index)}
                >
                  <img src={thumb} alt="product-thumb" />
                </SThumb>
              }
            />
          ))}
        </Tabs>
      )}
    </Box>
  );
};

export default Object.assign(Carousel, {
  Item: CarouselItem,
});
