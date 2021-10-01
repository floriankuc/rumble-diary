import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { SidebarContext } from './SidebarContext';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ActionItemC } from './ActionItem';

export interface NavActionItem {
  type: 'Nav';
  id: string;
  text?: string;
  icon?: React.ReactNode;
  navigatesTo: string;
}

export interface DefaultActionItem {
  type: 'Default';
  id: string;
  text?: string;
  icon?: React.ReactNode;
  action: () => void;
}

export type ActionItem = DefaultActionItem | NavActionItem;

export interface ISidebar {
  actionItems?: ActionItem[];
}

export const Sidebar = (props: ISidebar): React.ReactElement => {
  const { open, toggleSidebar } = React.useContext(SidebarContext);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    toggleSidebar(!open);
  };

  const renderItem = (item: ActionItem) => {
    return <ActionItemC actionItem={item} />;
  };

  return (
    <div>
      <Box sx={{ width: 250 }} role="presentation" onClick={(): void => toggleSidebar(false)} onKeyDown={(): void => toggleSidebar(false)}>
        <Drawer anchor="left" open={open} onClose={(): void => toggleSidebar(false)}>
          <Typography variant="h4">Menu</Typography>
          <List>
            {props.actionItems &&
              props.actionItems.map((item) => {
                return renderItem(item);
              })}
          </List>
        </Drawer>
      </Box>
    </div>
  );
};
