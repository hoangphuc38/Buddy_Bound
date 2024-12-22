import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import { getData, removeData, storeData } from '../helpers/asyncStorage';
import { httpClient } from '../helpers/axiosConfig';
import { TUser } from '../types/user.type';

interface AuthContextType {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await getData({ item: 'token' });
        if (storedToken) {
          const cleanedToken = storedToken.replace(/"/g, '');
          setToken(cleanedToken);
          httpClient.setAccessToken(cleanedToken);
        }
      } catch (error) {
        console.error('Error loading token:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadToken();
  }, []);

  const signIn = async (newToken: string) => {
    try {
      await storeData({ value: newToken, item: 'token' });
      setToken(newToken);
      httpClient.setAccessToken(newToken);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };

  const signOut = async () => {
    try {
      await removeData({ item: 'token' });
      setToken(null);
      httpClient.setAccessToken('');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  if (!isInitialized) {
    return null; // Or a loading component
  }

  return (
    <AuthContext.Provider value={{ token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
