import Realm from 'realm';
import {gradeType, userType} from '../types';

class Grade extends Realm.Object {
  id: string = '';
  grade: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'Grade',
    properties: {
      id: 'string',
      grade: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}
class UserData extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  token: string | null = null;
  grade: gradeType | null = null;
  initialDate: string = '';
  isSubscribed: boolean = false;
  user: userType | null = null; // Define the user property as a reference to the User object.
  selectedSubjects?: string[] | [];

  static schema: Realm.ObjectSchema = {
    name: 'UserData',
    properties: {
      _id: 'objectId',
      token: 'string?',
      grade: 'Grade?',
      initialDate: 'string?',
      isSubscribed: 'bool',
      user: 'User?', // Link the 'user' property to the 'User' object.
      selectedSubjects: 'string[]',
    },
    primaryKey: '_id',
  };
}

class Region extends Realm.Object {
  id: string = '';
  region: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'Region',
    properties: {
      id: 'string',
      region: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}

class User extends Realm.Object {
  id: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  region: {
    id: string;
    region: string;
    createdAt: string;
    updatedAt: string;
  } | null = null;
  isVerified: boolean = false;
  isActive: boolean = false;
  grade: gradeType | null = null;
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
      region: 'Region?',
      isVerified: 'bool',
      isActive: 'bool',
      grade: 'Grade',
      gender: 'string',
      email: 'string?',
      verificationCode: 'string?',
    },
  };
}

//subject object embeded inside of the subject returned by the server/api
class SingleSubject extends Realm.Object {
  id: string = '';
  subject: string = '';
  createdAt: string = '';
  updatedAt: string = '';

  static schema: Realm.ObjectSchema = {
    name: 'SingleSubject',
    properties: {
      id: 'string',
      subject: 'string',
      createdAt: 'string',
      updatedAt: 'string',
    },
  };
}
class Subject extends Realm.Object {
  id: string = '';
  description: string = '';
  icon: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  grade: gradeType | null = null;
  subject: {
    id: string;
    subject: string;
    createdAt: string;
    updatedAt: string;
  } | null = null;
  progress?: number;

  static schema: Realm.ObjectSchema = {
    name: 'Subject',
    properties: {
      id: 'string',
      description: 'string',
      icon: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      subject: 'SingleSubject?',
      progress: 'int',
    },
  };
}

export {UserData, User, Grade, Region, SingleSubject, Subject};
