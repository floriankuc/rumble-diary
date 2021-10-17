import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getItems, deleteItem } from '../actions/itemActions';
import { APP_ROUTES } from '../routes';

const ShoppingList = ({ getItems, deleteItem, item, user }) => {
  const history = useHistory();
  const navigateToLogin = () => history.push(APP_ROUTES.login);
  useEffect(() => {
    if (user && user.id) {
      getItems();
    }
  }, [user, getItems]);

  if (user && user.id) console.log('user.id', user.id);

  const onDeleteClick = (id) => {
    deleteItem(id);
  };

  const navigateToNightShow = (id) => history.push(APP_ROUTES.show.replace(':id', id));

  return (
    <div>
      <ul>
        {user &&
          item &&
          item.items.map((item) => {
            return (
              <li key={item._id}>
                {<button onClick={() => onDeleteClick(item._id)}>D</button>}
                {<p onClick={() => navigateToNightShow(item._id)}>{format(new Date(item.date), 'PPPPpppp')}</p>}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
