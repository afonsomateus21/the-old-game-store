import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// import type { User } from "../types/user";
import { api } from "../api";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  login: string;
  email: string;
  isAdmin: boolean;
  cpfCnpj: string;
}

interface AdminProfileFormInputs {
  name: string;
  login: string;
  email: string;
  // cpfCnpj: string;
}

interface AuthContentProps {
  login: (email: string, password: string) => Promise<void>;
  user: User | null;
  token: string;
  loading: boolean;
  updateUser: (form: AdminProfileFormInputs) => Promise<void>;
  deleteUser: () => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface TokenPayload {
  isAdmin: boolean;
  email: string;
  id: string 
}

const AuthContext = createContext<AuthContentProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const getProfile = async (token: string) => {
    try {
      // const token = localStorage.getItem("token") || '';
      // console.log(token)
      setToken(token);
      const { data } = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      console.log(data)

      const user: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        login: data.user.login,
        cpfCnpj: data.user.cpf_cnpj,
        isAdmin: data.user.is_admin
      }
      
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("users/login", {
        email,
        password
      });
      const token = data.token;
      if (token) {
        const decoded = jwtDecode<TokenPayload>(token);
        localStorage.setItem("token", data.token);
        setToken(token)
        console.log(decoded)
        await getProfile(token);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  }

  const updateUser = async (form: AdminProfileFormInputs) => {
    try {
      setLoading(true);

      console.log(form);

      await api.put(`/users/profile/update/${user?.id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUser(prev =>
        prev
          ? {
              ...prev,
              ...form,
            }
          : prev
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    try {
      if (!user) return;

      setLoading(true);

      await api.delete(`/users/profile/delete/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(null);
      setToken("");
      localStorage.removeItem("token");

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, token, loading, updateUser, deleteUser }}>
      { children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside a AuthProvider");
  }

  return context;
}