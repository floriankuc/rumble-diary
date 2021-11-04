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

  const renderItem = (item: ActionItemType): ReactElement => <ActionItem actionItem={item} key={item.id} />;

  const renderMainMenuIcon = (): ReactElement => (
    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleSidebar}>
      <MenuIcon />
    </IconButton>
  );

  const renderActionItems = (items: ActionItemType[]): ReactElement[] => {
    return items.map((item) => renderItem(item));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {matches && renderMainMenuIcon()}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FormattedMessage id="app.title" />
          </Typography>
          {!matches && actionItems && renderActionItems(actionItems)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
