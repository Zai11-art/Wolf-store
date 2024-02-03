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
import { toast } from "react-toastify";
import { Store } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams, useRouter } from "next/navigation";

import { useRoot } from "@/hooks/use-root";
import ApiCard from "@/components/api-card";
import WarningDialog from "@/components/warning-dialog";
import { useWarningDialog } from "@/hooks/use-edit-dialog";

interface SettingsFormProps {
  data: Store;
}

const formSchema = yup
  .object({
    name: yup.string().min(1),
  })
  .required();

type SettingsFormValuesTypes = yup.InferType<typeof formSchema>;

const SettingsForm: React.FC<SettingsFormProps> = ({ data }) => {
  console.log(data);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const sm = useMediaQuery("(min-width:700px)");
  const usewarningDialog = useWarningDialog();

  const theme = useTheme();
  const params = useParams();
  const router = useRouter();
  const root = useRoot();

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
  };

  // FIX ROUTES
  const onSubmit = async (payload: SettingsFormValuesTypes) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, payload);
      router.push(`/${params.storeId}`);
      router.refresh();
      toast.success("Submitted successfully");
    } catch (error) {
      console.log("[ERROR_SUBMIT_SETTINGS]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push(`/`);
      toast.success("Deleted successfully");
    } catch (error) {
      console.log("[ERROR_DELETE_SETTINGS]", error);
      toast.error("Error submitting.");
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
        <div>
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
                {data ? "Edit Settings" : "Create Settings"}
              </Typography>
              <Typography
                style={{
                  color: theme.palette.mode === "dark" ? "#c4c4c4" : " black",
                }}
              >
                {data
                  ? "Edit your Settings here."
                  : "Create new Settings for your store."}
              </Typography>
            </Box>
            {data && (
              <Button
                onClick={() =>
                  usewarningDialog.onOpen({ method: () => onDelete() })
                }
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
                        Store Name
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
        </div>
        <ApiCard
          label={"API_URL"}
          link={`${root}/api/${params.storeId}`}
          privacy={"PUBLIC"}
        />
      </Container>
    </>
  );
};
export default SettingsForm;
