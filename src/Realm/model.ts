import {createRealmContext} from '@realm/react';
import {UserData, User, Region} from './index';
export const AuthContext = createRealmContext({
  schema: [UserData, User, Region],
  deleteRealmIfMigrationNeeded: true,
});
