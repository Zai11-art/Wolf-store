"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { PlacardProps } from "@/app/(dashboard)/[storeId]/(routes)/placards/components/PlacardMain";

const ImageUpload = ({
  data,
  disabled,
  setFieldValue,
}: {
  data: PlacardProps;
  disabled: boolean;
  setFieldValue: (
    value: string,
    image: { image: { info: { secure_url: string } } }
  ) => void;
}) => {
  const [isMounted, setisMounted] = useState(false);
  const [imagesD, setImage] = useState<string | null>(null);
  const md = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const lightmode = theme.palette.mode === "dark";

  // console.log(imagesD);

  useEffect(() => {
    if (!isMounted) {
      setisMounted(true);
    }
  }, [imagesD]);

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const buttonColorMode2 = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode2 = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode2 = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode2 = theme.palette.mode === "dark" ? "white" : " black";

  if (!isMounted) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: md ? "100%" : "100%",
        }}
      >
        {imagesD ? (
          <Box
            sx={{
              backgroundColor: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={imagesD}
              style={{ height: "auto", width: "100%" }}
              alt="uploaded_img"
            />
          </Box>
        ) : (
          <Box
            sx={{
              border: lightmode ? "1px dashed white" : "1px dashed black",
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              paddingBottom: "20px",
              textAlign: "center",
              fontSize: 15,
              width: "100%",
            }}
          >
            No image yet. Click button below
          </Box>
        )}
      </Box>

      <CldUploadWidget
        options={{ multiple: true, maxFiles: 5 }}
        onUpload={(image) => {
          // @ts-ignore
          setImage(image?.info?.secure_url);
          // @ts-ignore
          setFieldValue("imageUrl", image?.info?.secure_url);
        }}
        uploadPreset="br4qkmxz"
      >
        {({ open }) => {
          return (
            <>
              {!imagesD && (
                <Button
                  disabled={disabled}
                  variant="contained"
                  onClick={() => open()}
                  sx={{
                    backgroundColor: buttonColorMode,
                    color: buttonTextMode,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode,
                      color: hoverTextMode,
                    },
                    fontSize: "13.5px",
                    paddingY: "4px",
                    position: "absolute",
                    bottom: 50,
                  }}
                >
                  <AddPhotoAlternateIcon />
                  <span style={{ marginTop: "3px" }}>
                    {data ? "EDIT" : "ADD"}
                  </span>
                </Button>
              )}
            </>
          );
        }}
      </CldUploadWidget>

      {imagesD && (
        <Button
          onClick={() => {
            setImage("");
          }}
          sx={{
            backgroundColor: "red",
            color: "#fff",
            fontWeight: "bold",
            ":hover": {
              backgroundColor: hoverColorMode2,
              color: hoverTextMode2,
            },
            fontSize: "13.5px",
            position: "absolute",
            right: 0,
            display: "flex",
          }}
        >
          <CloseIcon />
        </Button>
      )}
    </Box>
  );
};

export default ImageUpload;
