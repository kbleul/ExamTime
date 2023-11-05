import {createRealmContext} from '@realm/react';
import {UserData, User, Region, Grade, SingleSubject, Subject} from './index';
export const AuthContext = createRealmContext({
  schema: [UserData, User, Grade, Region, SingleSubject, Subject],
  deleteRealmIfMigrationNeeded: true,
});
