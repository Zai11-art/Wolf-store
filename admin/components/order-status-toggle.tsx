"use client";

import axios from "axios";
import * as React from "react";
import Grow from "@mui/material/Grow";
import { toast } from "react-toastify";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import RotateRightIcon from "@mui/icons-material/RotateRight";
import ErrorIcon from "@mui/icons-material/Error";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";

const options = [
  { label: "processing", color: "#b2a300", icon: <RotateRightIcon /> },
  { label: "failed", color: "red", icon: <ErrorIcon /> },
  { label: "shipped", color: "orange", icon: <LocalShippingIcon /> },
  { label: "delivered", color: "#00a152", icon: <CheckCircleOutlineIcon /> },
  { label: "cancelled", color: "#ff6333", icon: <CancelIcon /> },
];

export default function OrderStatusToggle({
  status,
  id,
}: {
  status: string;
  id: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const params = useParams();
  const router = useRouter();

  console.log("ORDEERS");
  console.log(params.storeId);

  const colorLogic =
    status === "processing"
      ? "yellow"
      : status === "failed"
      ? "red"
      : status === "shipped"
      ? "orange"
      : status === "delivered"
      ? "green"
      : status === "cancelled"
      ? "green"
      : "white";

  const handleSetStatus = async (status: string) => {
    try {
      const parsedData = { status: status, orderId: id };

      if (id && status) {
        await axios.get(
          `/api/${params.storeId}/orders`
          // parsedData
        );
      }

      //   if (res) {
      //     setLoading(true);
      //     toast.success("Successfully changing order status");
      //     router.refresh();
      //   }
    } catch (error) {
      console.error(error);
      toast.error("Failed changing status");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        color="inherit"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          sx={{
            backgroundColor: "black",
            borderColor: colorLogic,
            color: colorLogic,
            borderRadius: 10,
            paddingX: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {status}
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  sx={{
                    padding: 3,
                    border: "solid 0.5px gray",
                    marginTop: 1,
                    borderRadius: 3,
                  }}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Box
                      sx={{
                        width: "400px",
                        flexWrap: "wrap",
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          width: "100%",
                          fontWeight: "semibold",
                        }}
                      >
                        Set Order Status:
                      </Typography>
                      {options.map((option, index) => (
                        <MenuItem
                          sx={{
                            color: option.color,
                            fontSize: "12px",
                            textTransform: "uppercase",
                            fontWeight: "semibold",
                            border: `solid 0.5px ${option.color}`,
                            borderRadius: 5,
                            display: "flex",
                            gap: 0.5,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingX: 2,
                          }}
                          key={option.label}
                          disabled={option.label === status}
                          selected={option.label === status}
                          onClick={() => handleSetStatus(option.label)}
                        >
                          {option.icon} {option.label}
                        </MenuItem>
                      ))}
                    </Box>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
