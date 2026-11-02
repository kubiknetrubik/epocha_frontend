import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';

export const AppLayout: FC = () => (
  <div className="app-frame">
    <Outlet />
    <BottomNav />
  </div>
);
