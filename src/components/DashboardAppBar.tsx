import type { FC } from 'react';
import type { AppBarProps } from '@mui/material/AppBar';

import { styled } from '@mui/material/styles';

import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

import { signOut } from 'next-auth/react';
import { DASHBOARD_DRAWER_WIDTH } from './DashboardLayout';

interface DashboardAppBarProps {
  open: boolean;
  toggleDrawer: () => void;
}

interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<StyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: DASHBOARD_DRAWER_WIDTH,
    width: `calc(100% - ${DASHBOARD_DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export const DashboardAppBar: FC<DashboardAppBarProps> = ({
  open,
  toggleDrawer
}) => {
  const onLogout = async () => {
    signOut();
  };

  return (
    <StyledAppBar position='absolute' open={open}>
      <Toolbar sx={{ pr: '24px' }}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={toggleDrawer}
          sx={{
            marginRight: 1
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component='h1'
          variant='h6'
          color='inherit'
          noWrap
          sx={{ flexGrow: 1 }}
          fontWeight={800}
        >
          Dashboard
        </Typography>

        <IconButton
          color='inherit'
          aria-label='Cerrar sesión'
          onClick={onLogout}
        >
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};