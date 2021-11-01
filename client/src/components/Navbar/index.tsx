import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { ReactElement } from 'react';
import { ActionItemType, ActionItem } from '../ActionItem';
import { FormattedMessage } from 'react-intl';

export interface NavbarProps {
  actionItems?: ActionItemType[];
  toggleSidebar: () => void;
}

const Navbar = ({ actionItems, toggleSidebar }: NavbarProps): ReactElement => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const renderItem = (item: ActionItemType) => <ActionItem actionItem={item} key={item.id} />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {matches && (
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FormattedMessage id="app.title" />
          </Typography>
          {!matches &&
            actionItems &&
            actionItems.map((item) => {
              return renderItem(item);
            })}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
