import {createRealmContext} from '@realm/react';
import {UserData, User} from './index';
export const AuthContext = createRealmContext({
  schema: [UserData, User],
  deleteRealmIfMigrationNeeded: true,
});
