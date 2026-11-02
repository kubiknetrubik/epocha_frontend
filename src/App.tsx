import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import CatalogPage from './pages/CatalogPage';
import FeedPage from './pages/FeedPage';
import { ROUTES } from './Routes';

const App: FC = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.FEED} replace />} />
      <Route path={ROUTES.FEED} element={<FeedPage />} />
      <Route path={`${ROUTES.FEED}/:id`} element={<FeedPage />} />
      <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
      <Route path="*" element={<Navigate to={ROUTES.FEED} replace />} />
    </Route>
  </Routes>
);

export default App;
