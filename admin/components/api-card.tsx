import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import { IconButton, Button, useTheme } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Chip from "@mui/material/Chip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PublicIcon from "@mui/icons-material/Public";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface CardProps {
  label: string;
  link: string;
  privacy: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ApiCard({ label, link, privacy }: CardProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {/* SUCCESS MESSAGE */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={"Copied to clipboard."}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Copy to clickboard
        </Alert>
      </Snackbar>

      <Box sx={{ width: "100%", marginY: "10px" }}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            "&: hover": {
              transform: "scale(1.01)",
              transition: "all ease-in-out  0.15s ",
            },
          }}
        >
          <CardContent>
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
                  gap: "4px",
                }}
              >
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h5"
                  component="div"
                >
                  {label}
                </Typography>
              </Box>

              <Chip
                sx={{ color: "white" }}
                color={privacy === "ADMIN" ? "error" : "success"}
                icon={
                  privacy === "ADMIN" ? (
                    <AdminPanelSettingsIcon />
                  ) : (
                    <PublicIcon />
                  )
                }
                label={`${privacy}`}
              />
            </Box>
            <Typography
              sx={{ my: 1, fontSize: "0.8rem" }}
              color="text.secondary"
            >
              {new Intl.DateTimeFormat(["ban", "id"]).format(Date.now())}
            </Typography>
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{ width: "100%", mt: 1 }}
                id="outlined-basic"
                variant="outlined"
                value={link}
              />

              <Button
                onClick={() => copyToClipboard()}
                sx={{
                  mt: 1,
                  color: theme?.palette?.mode === "dark" ? "white" : "black",
                  border:
                    theme?.palette?.mode === "dark"
                      ? "1px solid #555555"
                      : "1px solid #c2c2c2",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              >
                <ContentCopyIcon />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
}
