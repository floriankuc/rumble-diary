import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
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
            Sleep Diary
          </Typography>
          {props.isAuthenticated && (
            <Button color="inherit" onClick={props.navigateToLogin} startIcon={<AddIcon />}>
              New entry
            </Button>
          )}
          {props.isAuthenticated && (
            <Button color="inherit" onClick={props.navigateToLogin} startIcon={<BarChartIcon />}>
              Diary
            </Button>
          )}
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
            <Button color="inherit" onClick={props.logout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
