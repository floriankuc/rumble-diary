import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';

export interface NavbarProps {
  isAuthenticated: boolean;
  toggleSidebar: () => void;
  navigateToRegister: () => void;
  navigateToLogin: () => void;
  logout: () => void;
}

const Navbar = (props: NavbarProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {props.isAuthenticated && (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={props.toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Tracker
          </Typography>
          {!props.isAuthenticated && (
            <Button color="inherit" onClick={props.navigateToRegister}>
              Register
            </Button>
          )}
          {!props.isAuthenticated && (
            <Button color="inherit" onClick={props.navigateToLogin}>
              Login
            </Button>
          )}
          {props.isAuthenticated && (
            <Button color="inherit" onClick={props.logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
