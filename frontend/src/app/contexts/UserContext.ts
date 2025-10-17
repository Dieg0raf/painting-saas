import { createContext } from "react";
import { UserProfile } from "@/app/types/auth";

type UserContextType = {
    user: UserProfile | null
    setUser: (user: UserProfile | null) => void
    login: (userData: UserProfile) => void
    logout: () => void
    isSignedIn: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined);
