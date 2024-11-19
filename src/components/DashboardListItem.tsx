import type { FC } from 'react';

import { useState } from 'react';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { alpha, useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { CustomMenuItem } from './DashboardLayout';

interface DashboardListItemProps {
  item: CustomMenuItem;
  isDashboardDrawerOpen: boolean;
  isOpen?: boolean;
}

export const DashboardListItem: FC<DashboardListItemProps> = ({
  item,
  isDashboardDrawerOpen,
  isOpen = false
}) => {
  const theme = useTheme();
  const pathname = usePathname();

  const [isOpenMenu, setIsOpenMenu] = useState(
    isOpen || item.menuItems.some(menuItem => menuItem.href === pathname)
  );
  const onToggleMenu = () => setIsOpenMenu(!isOpenMenu);

  const isSelected = item.menuItems.some(
    menuItem => menuItem.href === pathname
  );

  return (
    <Box>
      <ListItemButton
        onClick={onToggleMenu}
        selected={isSelected}
        sx={{
          '&.Mui-selected, &.Mui-selected:hover': {
            bgcolor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiSvgIcon-root':
              {
                color: theme.palette.primary.contrastText
              }
          },
          '&:hover': {
            bgcolor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary, & .MuiSvgIcon-root':
              {
                color: theme.palette.primary.contrastText
              }
          }
        }}
      >
        <ListItemIcon sx={{ py: 0, minWidth: isDashboardDrawerOpen ? 40 : 0 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText
          sx={{
            opacity: isDashboardDrawerOpen ? 1 : 0,
            textWrap: 'wrap'
          }}
          primary={item.title}
        />
        {isDashboardDrawerOpen ? (
          <>{isOpenMenu ? <ExpandLess /> : <ExpandMore />}</>
        ) : null}
      </ListItemButton>
      <Collapse in={isOpenMenu} timeout='auto' unmountOnExit>
        {item.menuItems.map(menuItem => (
          <ListItemButton
            component={NextLink}
            key={menuItem.title}
            selected={pathname === menuItem.href}
            disabled={!menuItem.isEnabled}
            aria-label={menuItem.title}
            href={menuItem.href}
            sx={{
              borderRadius: 0.6,
              m: theme.spacing(1),
              minHeight: 48,
              justifyContent: isDashboardDrawerOpen ? 'initial' : 'center',
              width: `calc(100% - ${theme.spacing(2)})`,
              '&.Mui-selected, &.Mui-selected:hover': {
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: theme.palette.primary.main
                }
              },
              '&:hover': {
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: theme.palette.primary.main
                }
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isDashboardDrawerOpen ? 1 : 'auto',
                justifyContent: 'center'
              }}
            >
              {menuItem.icon}
            </ListItemIcon>
            <ListItemText
              primary={menuItem.title}
              sx={{
                opacity: isDashboardDrawerOpen ? 1 : 0,
                textWrap: 'wrap'
              }}
            />
          </ListItemButton>
        ))}
      </Collapse>
    </Box>
  );
};