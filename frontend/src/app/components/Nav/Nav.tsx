"use client";

export default function Nav() {
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const { redirect, success } = await res.json();
    if (success === true) {
      window.location.href = redirect;
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
