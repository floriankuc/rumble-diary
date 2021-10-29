import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { ActionItemType, ActionItem } from '../ActionItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  paper: {
    width: 200,
  },
});

export interface SidebarProps {
  actionItems: ActionItemType[];
  open: boolean;
  toggleSidebar: (open: boolean) => void;
}

export const Sidebar = ({ toggleSidebar, open, actionItems }: SidebarProps): React.ReactElement => {
  const classes = useStyles();

  const renderItem = (item: ActionItemType) => <ActionItem actionItem={item} key={item.id} />;

  return (
    <Box role="presentation" onClick={(): void => toggleSidebar(false)} onKeyDown={(): void => toggleSidebar(false)}>
      <Drawer anchor="left" open={open} onClose={(): void => toggleSidebar(false)} PaperProps={{ className: classes.paper }}>
        <div>
          <Typography variant="h4" sx={{ padding: 2 }}>
            Menu
          </Typography>
          <List>{actionItems && actionItems.map((item) => renderItem(item))}</List>
        </div>
      </Drawer>
    </Box>
  );
};
