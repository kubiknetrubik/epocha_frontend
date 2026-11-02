import type { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../Routes';

interface TabItem {
  to: string;
  icon: string;
  label: string;
  disabled: boolean;
}

const TABS: TabItem[] = [
  { to: ROUTES.FEED, icon: '/icons/homesmall.svg', label: 'Лента', disabled: false },
  { to: ROUTES.ADD, icon: '/icons/addsmall.svg', label: 'Добавление', disabled: true },
  { to: ROUTES.CATALOG, icon: '/icons/gridsmall.svg', label: 'Плитка', disabled: false },
  { to: ROUTES.LOGIN, icon: '/icons/loginsmall.svg', label: 'Вход', disabled: true },
];

export const BottomNav: FC = () => (
  <Nav as="nav" className="tabbar" aria-label="Нижняя панель навигации">
    {TABS.map((tab) => (
      <Nav.Item key={tab.to} className="tabbar-item">
        {tab.disabled ? (
          <Nav.Link disabled className="nav-item nav-item--disabled" title={`${tab.label} — недоступно`}>
            <img src={tab.icon} alt={tab.label} className="nav-icon" />
          </Nav.Link>
        ) : (
          <Nav.Link
            as={NavLink}
            to={tab.to}
            className="nav-item"
            title={tab.label}
          >
            <img src={tab.icon} alt={tab.label} className="nav-icon" />
          </Nav.Link>
        )}
      </Nav.Item>
    ))}
  </Nav>
);
