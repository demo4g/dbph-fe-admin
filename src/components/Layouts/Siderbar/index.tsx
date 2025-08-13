import { Box } from '@mantine/core';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { sidebarData } from './data';
import { renderNavLink } from './renderNavLink';
import { SidebarWrapper } from './styled';

export interface ISidebarMenuITem {
  title?: string;
  path?: string; //Nếu là menu cha không cần path
  children?: ISidebarMenuITem[];
  icon?: ReactNode;
}

export interface ISidebarProps {}

export default function Sidebar(props: ISidebarProps) {
  useLocation();

  return (
    <SidebarWrapper>
      <Box mt={16}>{renderNavLink(sidebarData)}</Box>
    </SidebarWrapper>
  );
}
