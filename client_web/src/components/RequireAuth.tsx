import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTypedSelector } from '../reducers/store';

const RequireAuth = ({ children }: { children?: React.ReactNode }) => {
  const { isLogged } = useTypedSelector((state) => state.auth);
  return isLogged === true ? children as unknown as JSX.Element : <Navigate to='/signin' replace />;
}

export default RequireAuth;
