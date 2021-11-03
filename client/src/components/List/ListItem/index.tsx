import React, { MouseEvent } from 'react';
import { IconButton, ListItem as MuiListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Night } from '../../../entities/Night';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export interface ListItemProps {
  item: Night;
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const ListItem = ({ onItemClick, item, onDeleteClick }: ListItemProps) => {
  const classes = useStyles();

  return (
    <MuiListItem onClick={() => onItemClick(item._id)} button key={`${item._id}-listitem`} className={classes.listItem}>
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
