import { useEffect, useState, type FC } from 'react';

import List from '@mui/material/List';

import { usePathname } from 'next/navigation';

import { DashboardListItem } from './DashboardListItem';
import { CustomMenuItem } from './DashboardLayout';

interface DashboardSideBarProps {
  menuItems: CustomMenuItem[];
  isDashboardDrawerOpen: boolean;
}

export const DashboardSideBar: FC<DashboardSideBarProps> = ({
  menuItems,
  isDashboardDrawerOpen
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const matchedIndex = menuItems.findIndex(item =>
      item.menuItems.some(menuItem => menuItem.href === pathname)
    );
    setOpenIndex(matchedIndex !== -1 ? matchedIndex : 0);
  }, [pathname, menuItems]);

  return (
    <List component='nav' disablePadding>
      {menuItems.map((item, index) => (
        <DashboardListItem
          key={item.title}
          item={item}
          isDashboardDrawerOpen={isDashboardDrawerOpen}
          isOpen={index === openIndex}
        />
      ))}
    </List>
  );
};