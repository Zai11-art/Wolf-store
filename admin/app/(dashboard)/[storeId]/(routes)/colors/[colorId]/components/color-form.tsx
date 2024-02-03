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
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { Color } from "@prisma/client";
import { toast } from "react-toastify";
import { MuiColorInput } from "mui-color-input";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useRouter } from "next/navigation";

import WarningDialog from "@/components/warning-dialog";

interface SizeFormProps {
  data: Color | null;
}

const formSchema = yup
  .object({
    name: yup.string().min(1),
    value: yup.string().min(1),
  })
  .required();

type SizeFormValuesTypes = yup.InferType<typeof formSchema>;

const SizeForm: React.FC<SizeFormProps> = ({ data }: SizeFormProps) => {
  console.log(data);
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
    console.log(payload);
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          payload
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, payload);
      }
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success("Submitted successfully.");
    } catch (error) {
      console.log("[ERROR_SUBMIT_COLORFORM]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  // FIX ROUTES
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Deleted successfully.");
    } catch (error) {
      console.log("[ERROR_DEL_COLORFORM]", error);
      toast.error("Error deleting.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <WarningDialog loading={false} />
      <Container
        maxWidth={false}
        sx={{ display: "flex", flexDirection: "column" }}
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
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h4"
              component="div"
            >
              {data ? "Edit Color" : "Create Color"}
            </Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
              }}
            >
              {data
                ? "Edit your Color here."
                : "Create new Color for your store."}
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
                display: "flex",
              }}
            >
              <DeleteIcon />
              <span style={{ marginTop: "2px" }}>DELETE</span>
            </Button>
          )}
        </Box>

        <Divider
          sx={{
            mb: "30px",
            mt: "20px",
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
                      Color Value
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <MuiColorInput
                        format="hex"
                        name="value"
                        value={values.value}
                        onBlur={handleBlur}
                        onChange={(value) => setFieldValue("value", value)}
                        required
                        error={Boolean(touched.value) && Boolean(errors.value)}
                        helperText={touched.value && errors.value}
                      />
                    </Box>
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
    </>
  );
};

export default SizeForm;
