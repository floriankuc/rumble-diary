import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItem } from '../actions/itemActions';
import { useHistory, useRouteMatch } from 'react-router';

const Show = ({ getItem, item, user }) => {
  const history = useHistory();
  const match = useRouteMatch();
  useEffect(() => {
    if (user && user.id) {
      getItem(match.params.id);
    }
  }, [user, getItem]);

  if (user && user.id) console.log('user.id in show', user.id);

  return (
    <div>
      show here
      {item && item.item && item.item[0] && <p>{item.item[0]._id}</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItem })(Show);
