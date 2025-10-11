"use client";
import { useUser } from "@/app/hooks/useUser";

export default function Nav() {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      logout();
      window.location.href = "/login";
    }
  };

  return (
    <div>
      {user ? (
        <div>Logged in as {user.username}</div>
      ) : (
        <div>Not logged in</div>
      )}

      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Login
        </button>
      )}
    </div>
  );
}
