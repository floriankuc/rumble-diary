import React, { MouseEvent } from 'react';
import { IconButton, ListItem as MuiListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Night } from '../../../entities/Night';

export interface ListItemProps {
  item: Night;
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const ListItem = ({ onItemClick, item, onDeleteClick }: ListItemProps) => {
  return (
    <MuiListItem onClick={() => onItemClick(item._id)} button key={item._id + 'listitem'} style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography>{format(new Date(item.date), 'PPPP')}</Typography>
      <IconButton
        onClick={(e: MouseEvent): void => {
          e.stopPropagation();
          onDeleteClick(item._id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </MuiListItem>
  );
};
