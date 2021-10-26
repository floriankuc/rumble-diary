import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ActionItem, ActionItemC } from '../ActionItem';
export interface NavbarProps {
  actionItems?: ActionItem[];
  toggleSidebar: () => void;
}

const Navbar = (props: NavbarProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const renderItem = (item: ActionItem) => {
    return <ActionItemC actionItem={item} key={item.id} />;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {matches && (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={props.toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sleep Diary
          </Typography>
          {!matches &&
            props.actionItems &&
            props.actionItems.map((item) => {
              return renderItem(item);
            })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
