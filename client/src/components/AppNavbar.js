import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { connect } from 'react-redux';
import RegisterModal from './auth/RegisterModal';
import Button from '@mui/material/Button';
import { logout } from '../actions/authActions';
import MenuIcon from '@mui/icons-material/Menu';
import { ModalContext } from './Modal/ModalContext';
import { useHistory } from 'react-router-dom';
import { APP_ROUTES } from '../routes';

function AppNavbar(props) {
  const { isAuthenticated } = props.auth;
  const context = React.useContext(ModalContext);
  const history = useHistory();
  const navigateToLogin = () => history.push(APP_ROUTES.login);
  const navigateToRegister = () => history.push(APP_ROUTES.register);

  console.log('context', context);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Tracker
          </Typography>
          {/* {!isAuthenticated ? <RegisterModal /> : null} */}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AppNavbar);
