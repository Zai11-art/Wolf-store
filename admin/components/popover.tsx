"use client";

import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useTheme, Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import WarningDialog from "./warning-dialog";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "axios";

export default function BasicPopover({ data }) {
  const theme = useTheme();
  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAnc = Boolean(anchorEl);
  const id = openAnc ? "simple-popover" : undefined;

  // ADDITIONALS
  const [open, setOpen] = React.useState(false);
  const [loading, setIsloading] = React.useState(false);
  const router = useRouter();
  const params = useParams();

  const copy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("copied to clipboard");
  };

  const onDelete = async () => {
    try {
      setIsloading(true);
      await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
      router.refresh();
      toast.success("Category deleted");
    } catch (error) {
      toast.error("Remove all products first related to this category.");
    } finally {
      setIsloading(false);
      setOpen(false);
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

      <div>
        <Button
          sx={{
            paddingX: "15px",
            height: "35px",
            backgroundColor: buttonColorMode,
            color: buttonTextMode,
            ":hover": {
              backgroundColor: hoverColorMode,
              color: hoverTextMode,
            },
            fontWeight: "bold",
          }}
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
        >
          options
        </Button>
        <Popover
          id={id}
          open={openAnc}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{ borderRadius: "100px" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRadius: "15px",
              padding: "10px",
              py: "20px",
            }}
          >
            <Button
              onClick={() => () => copy(data.id)}
              sx={{
                borderRadius: "10px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                textTransform: "none",
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <ContentCopyIcon />
              <span>Copy id</span>
            </Button>

            <Button
              onClick={() =>
                router.push(`/${params.storeId}/categories/${data.id}`)
              }
              sx={{
                borderRadius: "10px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                textTransform: "none",
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <EditIcon />
              <span>Edit</span>
            </Button>

            <Button
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: "10px",
                color: theme.palette.mode === "dark" ? "white" : "black",
                textTransform: "none",
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <DeleteIcon />
              <span>Delete</span>
            </Button>
          </Box>
        </Popover>
      </div>
    </>
  );
}
