import React from 'react';
import AuthRoutes from './Auth';
import AppRoutes from './App';
import StackType from './StackType';

const Routes = ({Stack}: StackType) => {
  const user = true;

  return (
    <>{user ? <AppRoutes Stack={Stack} /> : <AuthRoutes Stack={Stack} />}</>
  );
};

export default Routes;
