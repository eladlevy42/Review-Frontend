import api from "@/services/api.service";
import { useLocalStorage } from "@uidotdev/usehooks";
import { AxiosError } from "axios";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  FC,
} from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  fullName: string;
  email: string;
}

interface AuthContextType {
  loggedInUser: User | null | undefined;
  login: (userData: LoginData) => Promise<LoginResponse>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  handleGoogleSuccess: (credentialResponse: {
    credential: string;
  }) => Promise<void>;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

interface LoginResponse {
  token: string;
  user: User; // Changed from `object` to `User`
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>(
    undefined
  );
  const [token, setToken] = useLocalStorage<string | null>("token", null);
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
      setLoggedInUser(null);
      return;
    }

    async function fetchUser() {
      try {
        const response = await api.get("/auth/login");
        setLoggedInUser(response.data);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401) {
          console.error("Invalid token, logging out");
          logout();
        } else if (axiosError.response?.status === 404) {
          console.error("User not found, logging out");
          logout();
        } else {
          console.error("Error fetching user data:", error);
        }
      }
    }

    fetchUser();
  }, [token]);

  const logout = () => {
    setToken(null);
    setLoggedInUser(null);
    toast({
      description: "You have been logged out.",
      variant: "warning",
    });
  };

  const login = async (userData: LoginData): Promise<LoginResponse> => {
    try {
      const response = await api.post("/auth/login", userData);
      setToken(response.data.token);
      setLoggedInUser(response.data.user); // Ensure the user is set correctly
      toast({
        description: "Login successful.",
        variant: "success",
      });
      return response.data;
    } catch (error: unknown) {
      console.error("Error logging in:", error);
      toast({
        description: "Error logging in, email or password incorrect.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      await api.post("/auth/register", userData);
      toast({
        description: "Registration successful.",
        variant: "success",
      });
    } catch (error: unknown) {
      console.error("Error registering:", error);
      toast({
        description: "Error registering.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }): Promise<void> => {
    const { credential } = credentialResponse;
    if (!credential) {
      console.error("Credential is undefined");
      toast({
        description: "Google login failed: Credential is undefined.",
        variant: "destructive",
      });
      return;
    }
    try {
      const response = await api.post("/auth/google", { credential });
      setToken(response.data.token);
      setLoggedInUser(response.data.user);
      toast({
        description: "Logged in with Google.",
        variant: "success",
      });
    } catch (error: unknown) {
      console.error("Google login failed:", error);
      toast({
        description: "Google login failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, login, register, logout, handleGoogleSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
