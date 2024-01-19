"use client";

import {
  Container,
  Box,
  useTheme,
  Typography,
  Divider,
  Button,
  TextField,
} from "@mui/material";

// React hook form
import ImageUpload from "@/components/image-upload";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Store } from "@prisma/client";

import * as yup from "yup";
import ApiCard from "@/components/api-card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRoot } from "@/hooks/use-root";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningDialog from "@/components/warning-dialog";

interface FormValue {
  name: string;
}

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

  const form = useForm<SettingsFormValuesTypes>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  // FIX ROUTES
  const onSubmit = async (payload: SettingsFormValuesTypes) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, payload);
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
      <WarningDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Container
        maxWidth={false}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <div>
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
                onClick={() => setOpen(true)}
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* <Box sx={{ marginBottom: "30px" }}>
           
          </Box> */}

              <Box sx={{ marginY: "30px" }}>
                <Typography sx={{ fontWeight: "bold", marginY: "15px" }}>
                  Store name
                </Typography>
                <TextField
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  id="outlined-basic"
                  label="Placard label"
                  variant="outlined"
                  required
                  {...register("name", { required: "Name is required" })}
                />
              </Box>
              <Box sx={{ marginBottom: "30px" }}>
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
                  Add Store
                </Button>
              </Box>
            </form>
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
