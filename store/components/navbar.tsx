"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import BoltIcon from "@mui/icons-material/Bolt";
import { ColorModeContext } from "@/providers/theme-provider";
import { useTheme, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CategoryIcon from "@mui/icons-material/Category";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import cartState from "@/hooks/cart-state";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/types";

function ResponsiveAppBar({ categories }: { categories: Category[] }) {
  const [isMounted, setisMounted] = useState(false);
  const colorMode = React.useContext(ColorModeContext);
  const md = useMediaQuery("(min-width:500px)");
  const theme = useTheme();
  const router = useRouter();
  const pathName = usePathname();
  const productCount = cartState();
  const navigate = useRouter();

  const data = categories.map((data) => ({
    href: `/category/${data.id}`,
    label: `${data.name}`,
    active: pathName === `/category/${data.id}`,
  }));

  const appBarColor = theme.palette.mode === "dark" ? "#000000" : "#FFFFFF";
  const textColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  React.useEffect(() => {
    setisMounted(true);
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // FOR SIDEBAR
  //   const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {data?.map((page) => (
          <Link
            href={page.href}
            key={page.label}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  sx={{ textDecoration: "none", color: "white" }}
                  primary={page.label}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const buttonColorMode = theme.palette.mode === "dark" ? "white" : "black";
  const buttonTextMode = theme.palette.mode === "dark" ? "black" : " white";
  const hoverColorMode = theme.palette.mode === "dark" ? "#262626" : " white";
  const hoverTextMode = theme.palette.mode === "dark" ? "white" : " black";

  if (!isMounted) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: appBarColor,
        color: textColor,
        padding: "5px",
        margin: "none",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <BoltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            onClick={() => navigate.push("/")}
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: "bold",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WOLF
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                setOpenSlider(!openSlider);
                handleOpenNavMenu;
              }}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              open={openSlider}
              onClose={() => setOpenSlider(!openSlider)}
            >
              {list()}
            </Drawer>
          </Box>
          <BoltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: "bold",
              fontFamily: "inherit",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WOLF
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {data.map((page) => (
              <Link
                href={page.href}
                key={page.label}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    textTransform: "none",
                    color: textColor,
                    display: "flex",
                    fontSize: "0.9rem",
                    borderBottom: page.active ? "1px #b9c5d9 solid" : "",
                    textDecoration: "none",
                  }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0.2}
            >
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ ml: 1 }}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>

              <Button
                onClick={() => router.push(`/carts`)}
                sx={{
                  backgroundColor: buttonColorMode,
                  color: buttonTextMode,
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: hoverColorMode,
                    color: hoverTextMode,
                  },
                  borderRadius: "20px",
                  padding: "5px",
                  height: md ? "35px" : "28px",
                  width: md ? "70px" : "28px",
                }}
              >
                {productCount.items.length}
                <ShoppingBagIcon />
              </Button>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
