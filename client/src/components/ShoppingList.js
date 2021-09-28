import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getItems, deleteItem } from '../actions/itemActions';

const ShoppingList = ({ getItems, deleteItem, item, user }) => {
  // const [items, setItems] = React.useState([
  //   { id: uuid(), name: 'eggs' },
  //   { id: uuid(), name: 'eggs2' },
  //   { id: uuid(), name: 'eggs3' },
  //   { id: uuid(), name: 'eggs4' },
  // ]);

  useEffect(() => {
    // if (user && user._id) {
    getItems(user._id);
    // }
  }, []);

  const onDeleteClick = (id) => {
    deleteItem(id);
  };

  return (
    <div>
      <ul>
        {user &&
          item &&
          item.items.map(({ _id, name }) => (
            <li key={_id}>
              {<button onClick={() => onDeleteClick(_id)}>D</button>}
              {name}
            </li>
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
