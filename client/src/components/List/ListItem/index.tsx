import React, { MouseEvent, ReactElement } from 'react';
import { IconButton, ListItem as MuiListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { Entry } from '../../../entities/Night';
import { makeStyles } from '@mui/styles';
import { countBools } from '../../../helpers/common';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { theme } from '../../../styles/theme';

const useStyles = makeStyles({
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dateAndIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    background: 'pink',
  },
});

export interface ListItemProps {
  item: Entry;
  onItemClick: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

export const ListItem = ({ onItemClick, item, onDeleteClick }: ListItemProps): ReactElement => {
  const classes = useStyles();

  const getSmileyIcon = (n: number): ReactElement => {
    switch (true) {
      case n < 3:
        return <SentimentSatisfiedAltIcon htmlColor={theme.colors.bar1} sx={{ mb: -0.5, mr: 1 }} />;
        break;
      case n < 6:
        return <SentimentNeutralIcon htmlColor={theme.colors.bar4} sx={{ mb: -0.5, mr: 1 }} />;
        break;
      default:
        return <SentimentVeryDissatisfiedIcon htmlColor={theme.colors.bar6} sx={{ mb: -0.5, mr: 1 }} />;
        break;
    }
  };

  const handleDeleteClick = (e: MouseEvent): void => {
    e.stopPropagation();
    onDeleteClick(item._id);
  };

  return (
    <MuiListItem onClick={(): void => onItemClick(item._id)} button key={`${item._id}-listitem`} className={classes.listItem}>
      <div>
        <Typography>
          {getSmileyIcon(countBools(item.observations))}
          {`${format(new Date(item.date), 'do MMMM yyyy (iiii)')}`}
        </Typography>
      </div>
      <IconButton onClick={handleDeleteClick}>
        <DeleteIcon />
      </IconButton>
    </MuiListItem>
  );
};
