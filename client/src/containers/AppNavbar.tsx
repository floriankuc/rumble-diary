import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import { logout } from '../actions/authActions';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import { SidebarContext } from '../components/Sidebar/SidebarContext';

function AppNavbar(props: any) {
  const { isAuthenticated, isLoading } = props.auth;
  const sidebarContext = React.useContext(SidebarContext);
  const history = useHistory();
  const navigateToLogin = () => history.push(APP_ROUTES.login);
  const navigateToRegister = () => history.push(APP_ROUTES.register);

  //isLoading jitter still there?
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => sidebarContext.toggleSidebar(!sidebarContext.open)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Tracker
          </Typography>
          {!isAuthenticated && (
            <Button color="inherit" onClick={navigateToRegister}>
              Register
            </Button>
          )}
          {!isAuthenticated && (
            <Button color="inherit" onClick={navigateToLogin}>
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button color="inherit" onClick={props.logout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
