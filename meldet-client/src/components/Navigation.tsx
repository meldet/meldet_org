import * as React from "react";
import Box from "@mui/material/Box";
import Link from "../components/Link";
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { IsMobileContext } from "../lib/context";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  //   [theme.breakpoints.down("md")]: {
  //     backgroundColor: theme.palette.secondary.main,
  //   },
  //   [theme.breakpoints.up("md")]: {
  //     backgroundColor: theme.palette.primary.main,
  //   },
  //   [theme.breakpoints.up("lg")]: {
  //     backgroundColor: green[500],
  //   },
}));

const links = [
  {
    href: "/",
    caption: "reports",
  },
  {
    href: "/about",
    caption: "about",
  },
  {
    href: "/contact",
    caption: "contact us",
  },
];

export default function Navigation({ children }: { children?: any }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  return (
    <IsMobileContext.Consumer>
      {({ isMobile }) => (
        <Paper elevation={2} sx={{ zIndex: "appBar", m: 1 }}>
          <Grid
            container
            justifyContent={"flex-end"}
            alignContent="center"
            alignItems="baseline"
            sx={{ p: isMobile ? 1 : 2 }}
            alignSelf="flex-end"
          >
            <Link
              noLinkStyle
              href="/report"
              sx={{ marginRight: 2, marginLeft: 0 }}
            >
              <Button variant="contained">Report</Button>
            </Link>
            {isMobile ? (
              <Box>
                <IconButton
                  id="navigation-button"
                  aria-controls="menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ padding: 0 }}
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "navigation-button",
                  }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {links.map((link) => (
                    <MenuItem key={link.href} onClick={handleClose}>
                      <Button color="secondary">
                        <Link noLinkStyle href={link.href}>
                          {link.caption}
                        </Link>
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              links.map((link) => (
                <Grid item key={link.href} alignSelf="center">
                  <Button color="secondary">
                    <Link noLinkStyle href={link.href}>
                      {link.caption}
                    </Link>
                  </Button>
                </Grid>
              ))
            )}
          </Grid>
        </Paper>
      )}
    </IsMobileContext.Consumer>
  );
}
