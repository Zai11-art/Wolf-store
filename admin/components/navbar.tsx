"use client";

import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { UserButton } from "@clerk/nextjs";
import Toolbar from "@mui/material/Toolbar";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import BoltIcon from "@mui/icons-material/Bolt";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useParams, usePathname } from "next/navigation";
import { ColorModeContext } from "@/providers/theme-provider";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// FOR DRAWER/ SIDE BAR
import { useState } from "react";
import List from "@mui/material/List";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PhotoSizeSelectSmallIcon from "@mui/icons-material/PhotoSizeSelectSmall";

// DROP DOWN
import DropDown from "./dropdown";
import { Store } from "@prisma/client";

interface StoreProps {
  stores: Store[];
}

const ResponsiveAppBar: React.FC<StoreProps> = ({ stores }: StoreProps) => {
  const params = useParams();
  const pathName = usePathname();

  // ROUTES
  const pages = [
    {
      label: "Dashboards",
      Icon: <DashboardIcon />,
      href: `/${params.storeId}`,
      active: pathName === `/${params.storeId}`,
    },
    {
      label: "Placards",
      Icon: <WallpaperIcon />,
      href: `/${params.storeId}/placards`,
      active: pathName === `/${params.storeId}/placards`,
    },
    {
      label: "Categories",
      Icon: <CategoryIcon />,
      href: `/${params.storeId}/categories`,
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      label: "Colors",
      Icon: <ColorLensIcon />,
      href: `/${params.storeId}/colors`,
      active: pathName === `/${params.storeId}/colors`,
    },
    {
      label: "Size",
      Icon: <PhotoSizeSelectSmallIcon />,
      href: `/${params.storeId}/sizes`,
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      label: "Products",
      Icon: <CardGiftcardIcon />,
      href: `/${params.storeId}/products`,
      active: pathName === `/${params.storeId}/products`,
    },
    {
      label: "Orders",
      Icon: <ShoppingCartIcon />,
      href: `/${params.storeId}/orders`,
      active: pathName === `/${params.storeId}/orders`,
    },
    {
      label: "Settings",
      Icon: <SettingsIcon />,
      href: `/${params.storeId}/settings`,
      active: pathName === `/${params.storeId}/settings`,
    },
  ];

  // FOR DARK MODE
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const appBarColor = theme.palette.mode === "dark" ? "#000000" : "#FFFFFF";
  const textColor = theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  // FOR SIDEBAR
  //   const [open, setOpen] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const sm = useMediaQuery("(min-width:1000px)");

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {pages.map((page, index) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton href={page.href}>
              <ListItemIcon>{page.Icon}</ListItemIcon>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

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

  return (
    <AppBar
      position="static"
      sx={{
        padding: "5px",
        margin: "none",
        backgroundColor: appBarColor,
        color: textColor,
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: "100%" }}>
        <Toolbar disableGutters>
          <BoltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
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
              <DropDown stores={stores} />
              {list()}
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: 0 }}></Box>
          <BoltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1.0,
              fontFamily: "arial",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WOLF
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <DropDown stores={stores} />
            {pages.map((page) => (
              <Button
                href={page.href}
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  textTransform: "none",
                  color: textColor,
                  display: "flex",
                  fontSize: "0.9rem",
                  borderBottom: page.active ? "1px #b9c5d9 solid" : "",
                }}
              >
                {page.label}
              </Button>
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
              <Box sx={{ marginTop: "200px" }}>
                <UserButton />
              </Box>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
