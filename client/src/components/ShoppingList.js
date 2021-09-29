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

  return (
    <div>
      <ul>
        {user &&
          item &&
          item.items.map(({ _id, name }) => (
            <>
              <li key={_id}>
                {<button onClick={() => onDeleteClick(_id)}>D</button>}
                {name}
              </li>
            </>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
