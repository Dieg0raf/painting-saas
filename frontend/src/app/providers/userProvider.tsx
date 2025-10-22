"use client";
import { useState, useEffect } from "react";
import { UserProfile } from "../types/auth/auth";
import { UserContext } from "../contexts/UserContext";

// Remounting the component will not lose the user data (reads from local storage)
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // check for user in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsSignedIn(!!userData);
    }
  }, []);

  // set user in local storage
  const login = (userData: UserProfile) => {
    setUser(userData);
    setIsSignedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // remove user from local storage
  const logout = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isSignedIn }}>
      {children}
    </UserContext.Provider>
  );
}
