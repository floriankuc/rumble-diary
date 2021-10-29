import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { logout } from '../actions/auth/authActions';

interface LogoutProps {
  logout: any;
}

class Logout extends Component<LogoutProps> {
  render() {
    return (
      <NavLink onClick={this.props.logout} href="#">
        logout
      </NavLink>
    );
  }
}

export default connect(null, { logout })(Logout);
