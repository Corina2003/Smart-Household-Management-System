import { Navigate, Route } from 'react-router-dom';

function ProtectedRoute({ element, ...rest }) {
  const token = localStorage.getItem('token');
  return token ? <Route {...rest} element={element} /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;