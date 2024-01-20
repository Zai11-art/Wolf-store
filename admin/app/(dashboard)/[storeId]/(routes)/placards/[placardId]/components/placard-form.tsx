"use client";

import {
  Container,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
  Stack,
  useMediaQuery,
} from "@mui/material";

// React hook form
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Placard } from "@prisma/client";
import { toast } from "react-toastify";

import * as yup from "yup";
import { Formik } from "formik";
import ImageUpload from "@/components/image-upload";
import { PlacardProps } from "../../page";

const formSchema = yup.object().shape({
  label: yup
    .string()
    .min(2, "Placard name too short.")
    .max(20, "Placard name too long.")
    .required("Label is Required"),
  imageUrl: yup.string().min(1).required("Image is Required"),
});

type PlacardFormValuesTypes = yup.InferType<typeof formSchema>;

export default function PlacardForm({ data }: { data: PlacardProps }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const md = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const params = useParams();
  const router = useRouter();

  const initialValue = {
    label: `${data ? data.label : ""}`,
    imageUrl: `${data ? data.imageUrl : ""}`,
  };

  const buttonColorMode = theme.palette.mode === "dark" ? "#ff1507" : "#ff1507";
  const buttonTextMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "white" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const buttonColorMode2 = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode2 = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode2 = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode2 = theme.palette.mode === "dark" ? "white" : " black";

  // for cloudinary

  const onSubmit = async (payload: PlacardFormValuesTypes) => {
    console.log(payload);
    try {
      setLoading(true);
      if (data) {
        await axios.patch(
          `/api/${params.storeId}/placards/${params.placardId}`,
          payload
        );
      } else {
        await axios.post(`/api/${params.storeId}/placards`, payload);
      }
      toast.success("Submitted successfully");
      router.push(`/${params.storeId}/placards`);
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (error) {
      console.log("[ERROR_SUBMIT_PLACARD]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/placards/${params.placardId}`);
      router.refresh();
      router.push(`/${params.storeId}/placards`);
      toast.success("Submitted successfully");
    } catch (error) {
      console.log("[ERROR_DELETE_PLACARD]", error);
      toast.error("Error submitting.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "100px",
        }}
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
              {data ? "Edit Placard" : "Create Placard"}
            </Typography>
            <Typography
              style={{
                color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
              }}
            >
              {data
                ? "Edit your placard here."
                : "Create new placard for your store."}
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
            // borderBottomWidth: "1px",
            backgroundColor:
              theme.palette.mode === "dark" ? "#555555" : "#c4c4c4",
          }}
        />

        <Box sx={{ display: "flex" }}>
          <Formik
            onSubmit={onSubmit}
            validationSchema={formSchema}
            initialValues={initialValue}
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
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", width: "100%", height: "100%" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    gap: 3,
                    flexDirection: md ? "row" : "column",
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: "30px",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                      Placard Image
                    </Typography>
                    {/* {imageUrl} */}

                    {/* IMAGE UPLOAD SECTION START */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <ImageUpload
                        // @ts-ignore
                        data={data}
                        disabled={loading}
                        setFieldValue={setFieldValue}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                      Placard Label
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <TextField
                        label="Placard label"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.label}
                        error={Boolean(touched.label) && Boolean(errors.label)}
                        helperText={touched.label && errors.label}
                        variant="outlined"
                        name="label"
                        required
                      />
                      <Button
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
                        {data ? "Edit Placard" : "Save Placard"}
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </>
  );
}
