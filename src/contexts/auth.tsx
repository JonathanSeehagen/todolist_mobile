import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}

//Informações que serão armazenadas no contexto
interface AuthContextData {
  signed: boolean;
  user: User | null; //Não sei quais informações o usuário pode retornar
  loading: boolean;
  signIn_context(): Promise<void>;
  signOut_context(): void;
}

//<> parâmetro de tipagem

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageDate() {
      const storagedUser = await AsyncStorage.getItem('@TodoMobile:user');
      const storagedToken = await AsyncStorage.getItem('@TodoMobile:token');

      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStorageDate();
    //No useEffect não aeita o async direto. Tem que criar a função e chamar em sequência
  }, []);

  async function signIn_context() {
    const response = await auth.signIn();
    setUser(response.user);

    //Envia em todas as chamadas api o token no header como default
    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.setItem(
      '@TodoMobile:user',
      JSON.stringify(response.user),
    );
    await AsyncStorage.setItem('@TodoMobile:token', response.token);
  }

  function signOut_context() {
    AsyncStorage.clear().then(() => {
      setUser(null);
    });
  }

  return (
    //!!user = Boolean(user)
    <AuthContext.Provider
      value={{signed: !!user, user, loading, signIn_context, signOut_context}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
