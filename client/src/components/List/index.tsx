import { format } from 'date-fns';
import React from 'react';

export interface ListProps {
  onItemClick: (id: any) => void;
  onDeleteClick: (id: any) => void;
  items: any[];
}

const List = (props: ListProps) => {
  console.log('all items from list component', props.items);
  return (
    <div>
      <ul>
        {props.items.map((item) => {
          return (
            <li key={item._id + 'listitem'}>
              {<button onClick={() => props.onDeleteClick(item._id)}>D</button>}
              {<p onClick={() => props.onItemClick(item._id)}>{format(new Date(item.date), 'PPPPpppp')}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
