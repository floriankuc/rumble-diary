import React from 'react';
import { connect } from 'react-redux';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';

const AppNavbar = (props) => {
  const { isAuthenticated, user } = props.auth;
  console.log('user in appnavbar', user);
  return (
    <div>
      <ul>
        {!isAuthenticated ? <RegisterModal /> : null}
        {!isAuthenticated ? <LoginModal /> : null}
        {isAuthenticated ? <Logout /> : null}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
