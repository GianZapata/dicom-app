'use client';

import type { FC, PropsWithChildren } from 'react';

import { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import { DashboardAppBar } from './DashboardAppBar';
import { DashboardSideBar } from './DashboardSideBar';
import { useMediaQuery, useTheme, Typography } from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';


export const doctorMenuItems: CustomMenuItem[] = [
   {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      menuItems: [
         {
            title: 'Pacientes',
            icon: <PeopleIcon aria-hidden='true' fontSize='small' />,
            href: '/dashboard/patients',
            isEnabled: true
         },
      ]
   }
]

export const hospitalMenuItems: CustomMenuItem[] = [
   {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      menuItems: [
         {
            title: 'Pacientes',
            icon: <PeopleIcon aria-hidden='true' fontSize='small' />,
            href: '/dashboard/patients',
            isEnabled: true
         },
      ]
   }
]

export const patientMenuItems: CustomMenuItem[] = [
   {
      title: 'Dashboard',
      icon: <DashboardIcon />,
      menuItems: [
         {
            title: 'Pacientes',
            icon: <PeopleIcon aria-hidden='true' fontSize='small' />,
            href: '/dashboard/patients',
            isEnabled: true
         },
      ]
   }
]

export const DASHBOARD_DRAWER_WIDTH = 240;

export interface CustomMenuItem {
  title: string;
  icon: JSX.Element;
  menuItems: CustomSubMenuItem[];
}

export interface CustomSubMenuItem {
  title: string;
  icon: JSX.Element;
  href: string;
  isEnabled: boolean;
}

interface DashboardLayoutProps {
  menuItems: CustomMenuItem[];
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DASHBOARD_DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    })
  }
}));

export const DashboardLayout: FC<PropsWithChildren<DashboardLayoutProps>> = ({
  children,
  menuItems
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [isDashboardDrawerOpen, setIsDashboardDrawerOpen] = useState(isDesktop);

  const toggleDashboardDrawer = () => {
    setIsDashboardDrawerOpen(prev => !prev);
  };

  useEffect(() => {
    setIsDashboardDrawerOpen(isDesktop);
  }, [isDesktop]);

  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardAppBar
        open={isDashboardDrawerOpen}
        toggleDrawer={toggleDashboardDrawer}
      />
      <StyledDrawer
        variant='permanent'
        open={isDashboardDrawerOpen}
        aria-label='Menú de navegación'
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1]
          }}
        >
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              noWrap
              
            >
              PIA
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        <DashboardSideBar
          menuItems={menuItems}
          isDashboardDrawerOpen={isDashboardDrawerOpen}
        />
      </StyledDrawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DASHBOARD_DRAWER_WIDTH}px)` }
        }}
        role='main'
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};