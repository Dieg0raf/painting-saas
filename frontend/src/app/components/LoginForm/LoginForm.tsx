"use client";
import { useUser } from "@/app/hooks/useUser";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useUser();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = async () => {
    // Calls our Next.js API route
    const res = await fetch("/api/auth/login", {
      // No CORS, same domain
      method: "POST",
      body: JSON.stringify({
        email: "john@rivaspro.com",
        password: "password123",
      }),
    });

    const data = await res.json();
    console.log("loginForm data: ", data);
    if (res.status === 200) {
      setIsLoggedIn(true);
      console.log("data.user: ", data);
      login(data.user);
      if (data.redirect) {
        window.location.href = data.redirect;
      }
      return;
    }

    if (!isLoggedIn) setIsLoggedIn(false);
  };
  return (
    <div>
      {isLoggedIn ? (
        <p className="text-green-500">Logged in</p>
      ) : (
        <p className="text-red-500">Not logged in</p>
      )}
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
