import { List as MuiList } from '@mui/material';
import React, { ReactElement } from 'react';
import { Night } from '../../entities/Night';
import { ListItem } from './ListItem';

export interface ListProps {
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  items: Night[];
}

const List = ({ items, onDeleteClick, onItemClick }: ListProps): ReactElement => {
  return (
    <MuiList>
      {items.map((item: Night) => {
        return <ListItem key={item._id} onItemClick={onItemClick} onDeleteClick={onDeleteClick} item={item} />;
      })}
    </MuiList>
  );
};

export default List;
