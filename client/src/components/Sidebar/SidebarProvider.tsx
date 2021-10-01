import React, { PropsWithChildren } from 'react';
import { SidebarContext } from './SidebarContext';

function SidebarProvider(props: PropsWithChildren<{}>) {
  const [open, toggleSidebar] = React.useState(false);

  return <SidebarContext.Provider value={{ open: open, toggleSidebar: toggleSidebar }}>{props.children}</SidebarContext.Provider>;
}

export default SidebarProvider;
