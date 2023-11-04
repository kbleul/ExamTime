import {createRealmContext} from '@realm/react';
import {UserData, User, Region, Grade} from './index';
export const AuthContext = createRealmContext({
  schema: [UserData, User, Grade, Region],
  deleteRealmIfMigrationNeeded: true,
});
