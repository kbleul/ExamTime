import React from 'react';
import AuthRoutes from './Auth';
import AppRoutes from './App';
import {StackType} from './types';

const Routes = ({Stack}: StackType) => {
  const user = true;

  return (
    <>{user ? <AppRoutes Stack={Stack} /> : <AuthRoutes Stack={Stack} />}</>
  );
};

export default Routes;
