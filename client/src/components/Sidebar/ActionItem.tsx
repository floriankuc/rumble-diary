import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionItem, DefaultActionItem, NavActionItem } from './Sidebar';

export interface IActionItemC {
  actionItem: ActionItem;
}

export const ActionItemC = (props: IActionItemC) => {
  const history = useHistory();

  const renderNavActionItem = (item: NavActionItem) => {
    return (
      <ListItem button key={item.id} onClick={(): void => history.push(item.navigatesTo)} disableRipple>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    );
  };

  const renderDefaultActionItem = (item: DefaultActionItem) => {
    return (
      <ListItem button key={item.id} onClick={item.action} disableRipple>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItem>
    );
  };

  switch (props.actionItem.type) {
    case 'Nav':
      return renderNavActionItem(props.actionItem);
    default:
      return renderDefaultActionItem(props.actionItem);
  }
};
