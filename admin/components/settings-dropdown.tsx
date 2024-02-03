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
import { useParams, useRouter } from "next/navigation";
import SettingsIcon from "@mui/icons-material/Settings";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { useWarningDialog } from "@/hooks/use-edit-dialog";

const options = ["Delete", "Edit"];

export default function SplitButton({
  dataType,
  id,
}: {
  id: string | undefined;
  dataType: string;
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  console.log(dataType);
  const router = useRouter();
  const params = useParams();
  const useWarningModal = useWarningDialog();

  const onDelete = async (storeId: string, placardId: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/${dataType}/${placardId}`);
      router.push(`/${storeId}/${dataType}`);
      toast.success("Submitted successfully");
    } catch (error) {
      console.log("[ERROR_DELETE_PLACARD]", error);
      toast.error("Error submitting.");
    } finally {
      setLoading(false);
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    // @ts-ignore
    if (event.target?.outerText === "Edit")
      router.push(`/${params.storeId}/${dataType}/${id}`);
    // @ts-ignore
    if (event.target?.outerText === "Delete")
      useWarningModal.onOpen({
        data: `${id ? id : ""}`,
        method: onDelete,
      });

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
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        color="inherit"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <SettingsIcon />
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
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
