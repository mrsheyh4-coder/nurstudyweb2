import { Navigate, useLocation } from 'react-router-dom';
import { isAdminSession } from '../../admin/auth.js';

export default function RequireAdmin({ children }) {
  const location = useLocation();
  if (!isAdminSession()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return children;
}
