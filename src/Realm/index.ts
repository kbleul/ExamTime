import Realm from 'realm';
import {userType} from '../types';

class UserData extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  token: string | null = null;
  grade: string = '';
  initialDate: string = '';
  isSubscribed: boolean = false;
  user: userType | null = null; // Define the user property as a reference to the User object.
  selectedSubjects?: string[] | [];

  static schema: Realm.ObjectSchema = {
    name: 'UserData',
    properties: {
      _id: 'objectId',
      token: 'string?',
      grade: 'string',
      initialDate: 'string?',
      isSubscribed: 'bool',
      user: 'User?', // Link the 'user' property to the 'User' object.
      selectedSubjects: 'string[]',
    },
    primaryKey: '_id',
  };
}

class User extends Realm.Object {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  region: string = '';
  isVerified: boolean = false;
  isActive: boolean = false;
  grade: string = '';
  gender: 'MALE' | 'FEMALE' = 'MALE';
  email: string | null = null;
  verificationCode: string | null = null;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
      id: 'string',
      firstName: 'string',
      lastName: 'string',
      phoneNumber: 'string',
      region: 'string',
      isVerified: 'bool',
      isActive: 'bool',
      grade: 'string',
      gender: 'string',
      email: 'string?',
      verificationCode: 'string?',
    },
  };
}

export {UserData, User};
