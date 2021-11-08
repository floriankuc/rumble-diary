import { List as MuiList } from '@mui/material';
import React, { ReactElement } from 'react';
import { Entry } from '../../entities/Night';
import { ListItem } from './ListItem';

export interface ListProps {
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  items: Entry[];
}

const List = ({ items, onDeleteClick, onItemClick }: ListProps): ReactElement => (
  <MuiList>
    {items.map((item: Entry) => (
      <ListItem key={item._id} onItemClick={onItemClick} onDeleteClick={onDeleteClick} item={item} />
    ))}
  </MuiList>
);

export default List;
