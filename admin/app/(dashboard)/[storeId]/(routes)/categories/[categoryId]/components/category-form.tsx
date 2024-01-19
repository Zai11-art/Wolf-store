"use client";

import {
  Container,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  useMediaQuery,
} from "@mui/material";

// React hook form
import axios from "axios";
import ImageUpload from "@/components/image-upload";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category, Placard } from "@prisma/client";
import WarningDialog from "@/components/warning-dialog";
import DeleteIcon from "@mui/icons-material/Delete";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Formik } from "formik";

interface CategoryFormProps {
  data: Category | null;
  placards: Placard[];
}

const formSchema = yup
  .object({
    name: yup.string().min(1),
    placardId: yup.string().min(1),
  })
  .required();

type CategoryFormValuesTypes = yup.InferType<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({
  data,
  placards,
}: CategoryFormProps) => {
  console.log(placards);

  const initialValues = {
    name: `${data ? data?.name : ""}`,
    placardId: `${data ? data?.storeId : ""}`,
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const sm = useMediaQuery("(min-width:700px)");

  // SELECT
  const [select, setSelect] = useState("");
  const handleChange = (e: SelectChangeEvent) => {
    setSelect(e.target.value);
  };

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

  // FIX ROUTES
  const onSubmit = async (payload: CategoryFormValuesTypes) => {
    console.log(payload);
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          payload
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, payload);
      }
      router.push(`/${params.storeId}/categories`);
      setTimeout(() => {
        router.refresh();
      }, 2000);
      toast.success("Submitted successfully.");
    } catch (error) {
      console.log("[ERROR_SUBMIT_CATFORM]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  // FIX ROUTES
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Deleted successfully.");
    } catch (error) {
      console.log("[ERROR_DEL_CATFORM]", error);
      toast.error("Error deleting.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <WarningDialog loading={loading} />
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
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h4"
              component="div"
            >
              {data ? "Edit Category" : "Create Category"}
            </Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
              }}
            >
              {data
                ? "Edit your category here."
                : "Create new category for your store."}
            </Typography>
          </Box>
          {data && (
            <Button
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
              Add new
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
                      label="Placard label"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      name="name"
                      required
                    />
                  </Box>

                  <Box
                    sx={{
                      marginY: sm ? "20px" : null,
                      display: "flex",
                      flexDirection: "column",
                      width: sm ? "300px" : "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                      Placard
                    </Typography>
                    <FormControl>
                      <InputLabel id="demo-simple-select-disabled-label">
                        placard
                      </InputLabel>
                      <Select
                        label="Placard id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.placardId}
                        error={
                          Boolean(touched.placardId) &&
                          Boolean(errors.placardId)
                        }
                        // helperText={touched.placardId && errors.placardId}
                        variant="outlined"
                        name="placardId"
                        required
                      >
                        {placards.map((plc) => (
                          <MenuItem value={plc.label}>{plc.label}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                    Add Category
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

export default CategoryForm;
