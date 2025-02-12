import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContextType, User} from '../utils/constants';

// Create the Auth context with a default value of undefined
const Auth = createContext<AuthContextType | undefined>(undefined);

// Define props for AuthContextProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthContextProvider component
const AuthContextProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user data from AsyncStorage on app startup
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };
    loadUserData();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserData = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Failed to save user data', error);
      }
    };
    saveUserData();
  }, [user]);

  return <Auth.Provider value={{user, setUser}}>{children}</Auth.Provider>;
};

// Custom hook to access the Auth context
export const useAuthState = (): AuthContextType => {
  const context = useContext(Auth);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;
