import { Navigate, Outlet } from 'react-router-dom';

import { routes } from './router';
import { accessToken } from './utils/storage';

export default function AuthRouter() {
  if (localStorage.getItem(accessToken)) {
    return <Outlet />;
  } else {
    return <Navigate to={routes.index} replace />;
  }
}
