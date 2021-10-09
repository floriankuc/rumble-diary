import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

const ShoppingList = ({ getItems, deleteItem, item, user }) => {
  useEffect(() => {
    if (user && user.id) {
      getItems();
    }
  }, [user, getItems]);

  if (user && user.id) console.log('user.id', user.id);

  const onDeleteClick = (id) => {
    deleteItem(id);
  };

  console.log('item in shoppinglist', item);
  return (
    <div>
      <ul>
        {user &&
          item &&
          item.items.map((item) => {
            console.log('ITEM', item);
            return (
              <li key={item._id}>
                {<button onClick={() => onDeleteClick(item._id)}>D</button>}
                {format(new Date(item.date), 'PPPPpppp')}
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
