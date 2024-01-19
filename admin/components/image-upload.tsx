"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { PlacardProps } from "@/app/(dashboard)/[storeId]/(routes)/placards/page";

interface ImageUploadProps {
  disabled?: boolean;
  setFieldValue: ({
    value,
    imageUrl,
  }: {
    value: string;
    imageUrl: { info: { secure_url?: string } };
  }) => void;
  value: string[];
}

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
  const [image, setImage] = useState<string | null>("");
  const md = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();

  useEffect(() => {
    if (!isMounted) {
      setisMounted(true);
    }
  }, []);

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
      }}
    >
      <Box
        sx={{
          height: "500px",
          width: md ? "600px" : "100%",
          marginBottom: "20px",
        }}
      >
        {data?.imageUrl || image ? (
          <>
            <img
              style={{
                height: "100%",
                display: "flex",
                width: "100%",
                borderRadius: 12,
              }}
              src={data?.imageUrl ? data?.imageUrl : image}
            />
          </>
        ) : (
          <Box
            sx={{
              border: "1px dashed white",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
              paddingBottom: "20px",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            No image yet. Click button below
          </Box>
        )}
      </Box>

      <CldUploadWidget
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
              {!image && (
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

      {image && (
        <Button
          onClick={() => {
            setImage(null);
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
            paddingY: "4px",
          }}
        >
          Remove
        </Button>
      )}
    </Box>
  );
};

export default ImageUpload;
