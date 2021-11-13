import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

import Logo from "../../img/logo1.png";
import { MdAccountCircle } from "react-icons/md";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./MyNav.css";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

export default function MyNav() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("user", user);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    history.push("/");
    setUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{ backgroundColor: "#00001b" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <img
              src={Logo}
              alt="Moment icon"
              style={{ width: "50px", height: "auto" }}
              className="logo"
            />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "block", sm: "block" } }}
            fontFamily="Montserrat"
          >
            Moment
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <React.Fragment>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Button variant="text">
                    <span style={{ color: "white", fontSize: "15px" }}>
                      Hello,{" "}
                    </span>
                    {user?.result.name}
                  </Button>
                  <IconButton size="small" sx={{ ml: 2 }}>
                    <MdAccountCircle
                      style={{
                        color: "white",
                        fontSize: "30px",
                        marginRight: "10px",
                      }}
                    />
                  </IconButton>

                  <Button onClick={logout}>Logout</Button>
                </Box>
              </React.Fragment>
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button variant="text" component={Link} to="/auth">
                LOGIN
              </Button>
              <Button variant="text" component={Link} to="/auth/signup">
                SIGNUP
              </Button>

              <React.Fragment>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <Link
                      to="/auth"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      LOGIN
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <Link to="/auth/signup">SIGN UP</Link>
                  </MenuItem>
                </Menu>
              </React.Fragment>
            </Box>
          )}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <TemporaryDrawer user={user ? user : "No User"} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function TemporaryDrawer({ user }) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {user ? (
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary={user?.result?.name} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="LOGIN" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText primary="SIGN UP" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Button onClick={toggleDrawer("right", true)}>
          <HiOutlineMenuAlt1 style={{ fontSize: "25px" }} />
        </Button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
