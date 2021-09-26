import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getItems, deleteItem } from '../actions/itemActions';

const ShoppingList = (props) => {
  // const [items, setItems] = React.useState([
  //   { id: uuid(), name: 'eggs' },
  //   { id: uuid(), name: 'eggs2' },
  //   { id: uuid(), name: 'eggs3' },
  //   { id: uuid(), name: 'eggs4' },
  // ]);

  useEffect(() => {
    props.getItems();
  }, []);

  const onDeleteClick = (id) => {
    console.log('click');
    props.deleteItem(id);
  };

  return (
    <div>
      <ul>
        {props.item.items.map(({ _id, name }) => (
          <li>
            <button onClick={() => onDeleteClick(_id)}>D</button>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
