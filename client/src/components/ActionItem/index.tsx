import { ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

export interface ActionItemType {
  readonly id: string;
  text?: ReactNode;
  icon?: ReactNode;
  component?: 'button' | 'listItem';
  action: (() => void) | (() => Promise<void>);
}

export interface ActionItemProps {
  actionItem: ActionItemType;
}

export const ActionItem = ({ actionItem }: ActionItemProps): ReactElement => {
  const renderListActionItem = ({ id, action, icon, text }: ActionItemType) => (
    <ListItem button key={id} onClick={action} disableRipple>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={text} />
    </ListItem>
  );

  const renderButtonActionItem = ({ icon, text, action }: ActionItemType): ReactElement => (
    <Button color="inherit" sx={{ mx: 1 }} onClick={action} startIcon={icon}>
      {text}
    </Button>
  );

  const renderActionItem = {
    listItem: renderListActionItem(actionItem),
    button: renderButtonActionItem(actionItem),
  };

  return renderActionItem[actionItem.component ?? 'button'];
};
