import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";

import { useTheme } from "@mui/material/styles";
import { useStoreDialog } from "@/hooks/use-store-dialog";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const options = ["Store 1", "Squash and merge"];

interface StoreProps {
  stores: {
    name: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  }[];
}

export default function DropDown({ stores }: StoreProps) {
  const theme = useTheme();
  const onOpen = useStoreDialog((state) => state.onOpen);
  const onClose = useStoreDialog((state) => state.onClose);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  const compColor = theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5";
  const textColor = theme.palette.mode === "dark" ? "white" : "#212121";

  const handleClick = () => {
    console.info(`You clicked ${stores[selectedIndex].name}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
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
    <Box
      sx={{
        display: "flex",
        height: "30px",
        m: "5px",
        p: "2px",
        mt: "5px",
        backgroundColor: "none",
      }}
    >
      <ButtonGroup
        sx={{
          ":hover": {
            backgroundColor: compColor, // theme.palette.primary.main
            color: textColor,
          },
          backgroundColor: compColor, // theme.palette.primary.main
          color: textColor,
          boxShadow: 3,
          width: "100%",
        }}
        variant="outlined"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: compColor,
            color: textColor,
            fontWeight: "500",
            fontSize: "80%",
            width: "100%",
            paddingTop: "8px",
          }}
        >
          {stores[selectedIndex].name}
        </Button>
        <Button
          sx={{
            backgroundColor: compColor,
            color: textColor,
          }}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
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
                  sx={{ boxShadow: 10 }}
                >
                  {stores.map((option, index) => (
                    <>
                      <MenuItem
                        key={option.name}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option.name}
                        <Divider />
                      </MenuItem>
                    </>
                  ))}
                  <MenuItem
                    onClick={onOpen}
                    sx={{
                      backgroundColor: buttonColorMode,
                      color: buttonTextMode,
                      // fontWeight: "bold",
                      ":hover": {
                        backgroundColor: hoverColorMode,
                        color: hoverTextMode,
                        transition: "all ease-in-out 0.2s",
                      },
                      borderRadius: "5px",
                      padding: "5px",
                      marginTop: "10px",
                      mx: "10px",
                      boxShadow: 2,
                    }}
                  >
                    <AddCircleOutlineIcon />
                    <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                      Create a new Store
                    </span>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
