import { ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import React, { ReactElement } from 'react';

export interface ActionItem {
  id: string;
  text?: string;
  icon?: React.ReactNode;
  component?: 'button' | 'listItem';
  action: (() => void) | (() => Promise<void>);
}

export interface ActionItemProps {
  actionItem: ActionItem;
}

export const ActionItemC = ({ actionItem }: ActionItemProps): ReactElement => {
  const renderListActionItem = (item: ActionItem) => (
    <ListItem button key={item.id} onClick={item.action} disableRipple>
      {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
      <ListItemText primary={item.text} />
    </ListItem>
  );

  const renderButtonActionItem = (item: ActionItem): ReactElement => (
    <Button color="inherit" sx={{ mx: 1 }} onClick={item.action} startIcon={item.icon}>
      {item.text}
    </Button>
  );

  const renderActionItem = {
    listItem: renderListActionItem(actionItem),
    button: renderButtonActionItem(actionItem),
  };

  return renderActionItem[actionItem.component ?? 'button'];
};
