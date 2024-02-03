"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { Image as ImageType } from "@/types";

const ImageSLider = ({ images }: { images: ImageType[] }) => {
  const md = useMediaQuery("(min-width:800px)");

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
          width: "100%",
          height: "100%",
        }}
      >
        {images.map((image, i) => (
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
