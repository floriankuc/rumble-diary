import React, { PropsWithChildren, ReactElement } from 'react';
import { SidebarContext } from './SidebarContext';

function SidebarProvider({ children }: PropsWithChildren<{}>): ReactElement {
  const [open, toggleSidebar] = React.useState(false);

  return <SidebarContext.Provider value={{ open: open, toggleSidebar: toggleSidebar }}>{children}</SidebarContext.Provider>;
}

export default SidebarProvider;
