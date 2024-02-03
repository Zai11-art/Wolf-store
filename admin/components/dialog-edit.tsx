"use client";

import axios from "axios";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { IconButton, useTheme, Box } from "@mui/material";
import { useStoreDialog } from "@/hooks/use-store-dialog";
import DialogContentText from "@mui/material/DialogContentText";

// React hook form

interface FormValue {
  name: string;
}

export default function EditDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const storeDialog = useStoreDialog();
  const theme = useTheme();

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const form = useForm<FormValue>({
    defaultValues: {
      name: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValue) => {
    try {
      console.log(data);
      setLoading(true);
      const response = await axios.post("/api/stores", data);
      console.log(response);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          padding: "10px",
        },
      }}
      open={storeDialog.isOpen}
      onClose={storeDialog.onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ display: "flex" }}>
          <DialogTitle>Edit Placard name</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={storeDialog.onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>
            Create stores to access the dashboard. Customize, watch, and edit
            your products in this CMS.
          </DialogContentText>
          <TextField
            sx={{ marginTop: "15px" }}
            disabled={loading}
            autoFocus
            margin="dense"
            id="name"
            label="Store name"
            type="text"
            fullWidth
            variant="standard"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </DialogContent>
        <DialogActions sx={{ paddingTop: "0px" }}>
          <Button
            variant="outlined"
            // sx={{
            //   backgroundColor: buttonColorMode,
            //   color: buttonTextMode,
            //   fontWeight: "bold",
            //   ":hover": {
            //     backgroundColor: hoverColorMode,
            //     color: hoverTextMode,
            //   },
            //   fontSize: "13.5px",
            // }}
            sx={{ fontWeight: "bold" }}
            color="error"
            onClick={storeDialog.onClose}
          >
            Cancel
          </Button>
          <Button
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
            type="submit"
          >
            Add Store
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
