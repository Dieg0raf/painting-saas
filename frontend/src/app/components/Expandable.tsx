"use client";

import { useState } from "react";

export default function Expandable({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-2 border-gray-300 p-2 rounded-md">
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
    </div>
  );
}
