"use client";

import Typography from "@mui/material/Typography";
import { useParams, useRouter } from "next/navigation";
import { Box, Button, Container, Divider, useTheme } from "@mui/material";

import ApiList from "@/components/api-list";
import DataTable from "@/components/DataTable";

export interface SizeProps {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

interface SizeMainProps {
  data: SizeProps[];
}

const SizeMain: React.FC<SizeMainProps> = ({ data }: SizeMainProps) => {
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
          // marginBottom: "20px",
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
            Sizes
          </Typography>
          <Typography
            style={{
              color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
            }}
          >
            Upload, create, manage and edit your Sizes here
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
          sx={{
            backgroundColor: buttonColorMode,
            color: buttonTextMode,
            fontWeight: "bold",
            ":hover": {
              backgroundColor: hoverColorMode,
              color: hoverTextMode,
            },
            height: "35px",
            width: "150px",
          }}
        >
          Add new
        </Button>
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
      <DataTable dataType="sizes" data={data} />

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
      <ApiList sectionName="sizes" sectionId="sizeId" />
    </Container>
  );
};

export default SizeMain;
