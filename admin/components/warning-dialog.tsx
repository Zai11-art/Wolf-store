import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Box, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useWarningDialog } from "@/hooks/use-edit-dialog";
import { useParams, useRouter } from "next/navigation";

interface WarningDialog {
  loading: boolean;
}

const WarningDialog: React.FC<WarningDialog> = ({ loading }) => {
  const [isMounted, setIsMounted] = React.useState(false);
  const theme = useTheme();
  const dialog = useWarningDialog();
  const { storeId } = useParams();
  const dialogData = useWarningDialog((state) => state.data);
  const router = useRouter();

  React.useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const buttonColorMode2 =
    theme.palette.mode === "dark" ? "#ff1507" : "#ff1507";
  const buttonTextMode2 = theme.palette.mode === "dark" ? "white" : " white";
  const hoverColorMode2 = theme.palette.mode === "dark" ? "white" : " white";
  const hoverTextMode2 = theme.palette.mode === "dark" ? "white" : " black";

  return (
    <div>
      <Dialog
        open={dialog.isOpen}
        onClose={dialog.onClose}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "20px",
            padding: "10px",
            paddingBottom: "15px",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <DialogTitle>Delete</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={dialog.onClose}
            sx={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
            variant="contained"
            color="error"
            disabled={loading}
            onClick={dialog.onClose}
          >
            Close
          </Button>
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
            disabled={loading}
            onClick={() => {
              // @ts-ignore
              dialog.data?.method(storeId, dialog.data.id);
              dialog.onClose();
              setTimeout(() => {
                router.refresh();
              }, 2000);
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WarningDialog;
