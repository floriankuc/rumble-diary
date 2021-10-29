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

export const Sidebar = (props: SidebarProps): React.ReactElement => {
  const classes = useStyles();

  const renderItem = (item: ActionItemType) => {
    return <ActionItem actionItem={item} key={item.id} />;
  };

  return (
    <Box role="presentation" onClick={(): void => props.toggleSidebar(false)} onKeyDown={(): void => props.toggleSidebar(false)}>
      <Drawer anchor="left" open={props.open} onClose={(): void => props.toggleSidebar(false)} PaperProps={{ className: classes.paper }}>
        <div style={{ background: 'pink' }}>
          <Typography variant="h4" sx={{ padding: 2 }}>
            Menu
          </Typography>
          <List>
            {props.actionItems &&
              props.actionItems.map((item) => {
                return renderItem(item);
              })}
          </List>
        </div>
      </Drawer>
    </Box>
  );
};
