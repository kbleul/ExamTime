import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userType} from '../Types';
import {LocalStorageDataKeys} from '../utils/Data/data';
import {
  setObject_to_localStorage,
  set_to_localStorage,
} from '../utils/Functions/Set';

// Define the context value type
interface AuthContextValue {
  user: userType | null;
  setUser: (user: userType | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string, user: userType) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: boolean | null;
  setError: (error: boolean | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useGlobalState() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useGlobalState must be used within an AuthProvider');
  }

  return context;
}

export function AuthProvider({children}: {children: ReactNode}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<userType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<boolean | null>(null);

  const login = useCallback((newToken: string, newUser: userType) => {
    set_to_localStorage(LocalStorageDataKeys.token, newToken);

    setObject_to_localStorage(LocalStorageDataKeys.userData, newUser);

    setToken(newToken);
    setUser(newUser);
    setIsLoading(false);
    setError(null);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    setIsLoading(false);
    setError(null);

    try {
      await AsyncStorage.removeItem(LocalStorageDataKeys.userData);
      await AsyncStorage.removeItem(LocalStorageDataKeys.token);
    } catch (e) {
      // Handle remove error
    }
  }, []);

  useEffect(() => {
    const checkResult = async () => {
      const result = await checkLoggedIn();
      if (result) {
        login(result.token, result.user);
      }
    };

    checkResult();
  }, [login]);

  interface ResultType {
    user: userType;
    token: string;
  }

  const checkLoggedIn = async (): Promise<ResultType | null> => {
    try {
      const jsonValue_user = await AsyncStorage.getItem(
        LocalStorageDataKeys.userData,
      );
      const tokenValue = await AsyncStorage.getItem(LocalStorageDataKeys.token);

      if (jsonValue_user && tokenValue) {
        return {
          token: tokenValue,
          user: JSON.parse(jsonValue_user),
        };
      }
      return null;
    } catch (e) {
      // Handle error reading value
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
