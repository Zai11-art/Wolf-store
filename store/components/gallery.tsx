"use client";

import Slider from "react-slick";

import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useMediaQuery } from "@mui/material";

const dummyData = [
  {
    url: "https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    url: `https://images.pexels.com/photos/1770775/pexels-photo-1770775.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load`,
  },
];

const ImageSLider = () => {
  const md = useMediaQuery("(min-width:800px)");
  const lg = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        display: "flex",
        height: md ? "550px" : "550px",
        width: md ? "100%" : "100%",
        borderRadius: "15px",
        boxShadow: 15,
      }}
    >
      <Carousel
        navButtonsAlwaysVisible={true}
        swipe
        sx={{
          // backgroundColor: "red",
          width: "100%",
          height: "100%",
        }}
      >
        {dummyData.map((image, i) => (
          <Image
            style={{
              display: "flex",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "15px",
              aspectRatio: "1/1",
            }}
            key={i}
            id={image.url}
            src={image.url}
            alt="image"
            fill
          />
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageSLider;
