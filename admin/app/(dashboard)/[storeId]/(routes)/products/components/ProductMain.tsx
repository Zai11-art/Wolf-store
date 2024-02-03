"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";

import ApiList from "@/components/api-list";
import DataTable from "@/components/DataTable";
import TextPopOver from "@/components/text-popover";
import { Category, Color, Size } from "@prisma/client";

export interface ProductProps {
  id: string;
  name: string;
  price: string;
  color: string;
  size: string;
  category: string;
  isFeatured: string;
  isArchived: string;
  createdAt: string;
}

interface PlacardMainProps {
  data: ProductProps[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}
const ProductMain: React.FC<PlacardMainProps> = ({
  data,
  categories,
  colors,
  sizes,
}: PlacardMainProps) => {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column", marginTop: "25px" }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: "1px",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4" component="div">
            Products
          </Typography>
          <Typography
            style={{
              color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
            }}
          >
            Upload, create, manage and edit your Products here
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            disabled={
              categories.length === 0 &&
              colors.length === 0 &&
              sizes.length === 0
                ? true
                : false
            }
            variant="contained"
            onClick={() => router.push(`/${params.storeId}/products/new`)}
            sx={{
              backgroundColor: buttonColorMode,
              color: buttonTextMode,
              fontWeight: "bold",
              ":hover": {
                backgroundColor: hoverColorMode,
                color: hoverTextMode,
              },
              height: "35px",
              width: "120px",
            }}
          >
            {categories.length === 0 &&
            colors.length === 0 &&
            sizes.length === 0
              ? "MISSING INFO"
              : "ADD NEW"}
          </Button>

          {categories.length === 0 &&
            colors.length === 0 &&
            sizes.length === 0 && (
              <Box sx={{ display: "flex", gap: "2px" }}>
                {[
                  {
                    message: "* Categories Missing",
                    popoverMessage: `No categories found. Go to Categories section to add Category.`,
                    data: categories,
                  },
                  {
                    message: "* Colors Missing",
                    popoverMessage: `No Colors found. Go to Colors section to add Color.`,
                    data: colors,
                  },
                  {
                    message: "* Sizes Missing",
                    popoverMessage: `No Sizes found. Go to Sizes section to add Size.`,
                    data: sizes,
                  },
                ].map((data) => (
                  <TextPopOver
                    message={data.message}
                    popoverMessage={data.popoverMessage}
                    data={data.data}
                  />
                ))}
              </Box>
            )}
        </Box>
      </Box>
      <Divider
        sx={{
          mb: "30px",
          mt: "20px",

          backgroundColor:
            theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
        }}
      />

      {/* TABLE HERE */}
      <DataTable dataType="products" data={data ? data : []} />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "1px",
          flexDirection: "column",
          marginTop: "40px",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h4" component="div">
          API Endpoints
        </Typography>
        <Typography
          style={{
            color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
          }}
        >
          Get your endpoints here. Copy and paste.
        </Typography>
      </Box>
      <Divider
        sx={{
          mb: "30px",
          mt: "20px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
        }}
      />
      {/* API SECTION */}
      <ApiList sectionName="products" sectionId="productId" />
    </Container>
  );
};

export default ProductMain;
