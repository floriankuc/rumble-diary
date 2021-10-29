import { format } from 'date-fns';
import React, { ReactElement } from 'react';
import { Night } from '../../entities/Night';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List as MuiList, ListItem, Typography } from '@mui/material';

export interface ListProps {
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
  items: Night[];
}

const List = ({ items, onDeleteClick, onItemClick }: ListProps): ReactElement => {
  return (
    <MuiList>
      {items.map((item: Night) => {
        return (
          <ListItem button key={item._id + 'listitem'} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography onClick={() => onItemClick(item._id)}>{format(new Date(item.date), 'PPPP')}</Typography>
            <IconButton onClick={(): void => onDeleteClick(item._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </MuiList>
  );
};

export default List;
