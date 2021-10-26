import { format } from 'date-fns';
import React from 'react';
import { Night } from '../../entities/Night';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List as MuiList, ListItem, Typography } from '@mui/material';

export interface ListProps {
  onItemClick: (id: any) => void;
  onDeleteClick: (id: any) => void;
  items: Night[];
}

const List = (props: ListProps) => {
  console.log('all items from list component', props.items);
  return (
    <MuiList>
      {props.items.map((item) => {
        return (
          <ListItem button key={item._id + 'listitem'} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography onClick={() => props.onItemClick(item._id)}>{format(new Date(item.date), 'PPPP')}</Typography>
            <IconButton onClick={(): void => props.onDeleteClick(item._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        );
      })}
    </MuiList>
  );
};

export default List;
