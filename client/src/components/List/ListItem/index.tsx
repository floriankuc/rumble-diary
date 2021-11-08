import React, { MouseEvent, ReactElement } from 'react';
import { IconButton, ListItem as MuiListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Entry } from '../../../entities/Night';
import { makeStyles } from '@mui/styles';
import { outputMinutes } from '../../../helpers/date';

const useStyles = makeStyles({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export interface ListItemProps {
  item: Entry;
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const ListItem = ({ onItemClick, item, onDeleteClick }: ListItemProps): ReactElement => {
  const classes = useStyles();

  return (
    <MuiListItem onClick={(): void => onItemClick(item._id)} button key={`${item._id}-listitem`} className={classes.listItem}>
      <Typography>{`${format(new Date(item.date), 'do MMMM yyyy (iiii)')}`}</Typography>
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
