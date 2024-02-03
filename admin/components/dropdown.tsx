import * as React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Popper from "@mui/material/Popper";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useParams, usePathname, useRouter } from "next/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { Store } from "@prisma/client";
import { useStoreDialog } from "@/hooks/use-store-dialog";

interface StoreProps {
  stores: Store[];
}

export default function DropDown({ stores }: StoreProps) {
  const theme = useTheme();
  const router = useRouter();
  const { storeId } = useParams();
  const onOpen = useStoreDialog((state) => state.onOpen);

  const currStore = stores.find((store) => store.id === storeId);

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
    // @ts-ignore
    const store = stores.find((store) => store.name === event.target.outerText);
    router.push(`/${store?.id}`);

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
          {currStore?.name}
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
