import React from 'react';
import AuthRoutes from './Auth';
import AppRoutes from './App';
import StackType from './StackType';

const Routes = ({Stack}: StackType) => {
  return <AppRoutes Stack={Stack} />;
};

export default Routes;
