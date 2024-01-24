"use client";

import {
  Container,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";

// React hook form
import ImageUpload from "@/components/image-upload";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Size } from "@prisma/client";
import { toast } from "react-toastify";

import * as yup from "yup";
import { Formik } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface SizeFormProps {
  data: Size | null;
}

const formSchema = yup
  .object({
    name: yup.string().min(1),
    value: yup.string().min(1),
  })
  .required();

type SizeFormValuesTypes = yup.InferType<typeof formSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ data }: SizeFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const sm = useMediaQuery("(min-width:700px)");

  const theme = useTheme();
  const params = useParams();
  const router = useRouter();

  const buttonColorMode = theme.palette.mode === "dark" ? "#ff1507" : "#ff1507";
  const buttonTextMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const buttonColorMode2 = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode2 = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode2 = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode2 = theme.palette.mode === "dark" ? "white" : " black";

  const initialValues = {
    name: `${data ? data?.name : ""}`,
    value: `${data ? data?.value : ""}`,
  };

  // FIX ROUTES
  const onSubmit = async (payload: SizeFormValuesTypes) => {
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          payload
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, payload);
      }
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success("Submitted successfully.");
    } catch (error) {
      console.log("[ERROR_SUBMIT_SIZEFORM]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  // FIX ROUTES
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success("Deleted successfully.");
    } catch (error) {
      console.log("[ERROR_DELETE_SIZEFORM]", error);
      toast.error("Error deleting.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{ display: "flex", flexDirection: "column" }}
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
            {data ? "Edit Product Size" : "Create Product Size"}
          </Typography>
          <Typography
            style={{
              color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
            }}
          >
            {data
              ? "Edit your Product Size here."
              : "Create new Product Size for your store."}
          </Typography>
        </Box>
        {data && (
          <Button
            disabled={loading}
            onClick={() => onDelete()}
            variant="contained"
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
            DELETE
          </Button>
        )}
      </Box>

      <Divider
        sx={{
          mb: "30px",
          mt: "20px",
          // borderBottomWidth: "1px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
        }}
      />

      {/* DATE SECTIONS */}
      <Box>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={formSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "18px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    marginY: sm ? "20px" : null,
                    width: sm ? null : "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                    Name
                  </Typography>
                  <TextField
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    required
                    sx={{ width: sm ? "400px" : null, display: "flex" }}
                  />
                </Box>
                <Box
                  sx={{
                    marginY: sm ? "20px" : null,
                    width: sm ? null : "100%",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                    Sizes Value
                  </Typography>
                  <TextField
                    value={values.value}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.value) && Boolean(errors.value)}
                    helperText={touched.value && errors.value}
                    id="outlined-basic"
                    label="Value"
                    variant="outlined"
                    name="value"
                    required
                    sx={{ width: sm ? "400px" : null, display: "flex" }}
                  />
                </Box>
              </Box>

              <Box sx={{ marginY: "30px" }}>
                <Button
                  disabled={loading}
                  sx={{
                    backgroundColor: buttonColorMode2,
                    color: buttonTextMode2,
                    fontWeight: "bold",
                    ":hover": {
                      backgroundColor: hoverColorMode2,
                      color: hoverTextMode2,
                    },
                    fontSize: "13.5px",
                    paddingY: "4px",
                  }}
                  type="submit"
                >
                  {data ? "UPDATE" : "CREATE"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SizeForm;
