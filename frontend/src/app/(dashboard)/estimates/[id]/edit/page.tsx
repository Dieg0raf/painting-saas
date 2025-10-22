"use client";

import { useParams } from "next/navigation";

export default function EditEstimatePage() {
  const { id } = useParams();
  return (
    <div>
      <h1>Edit Estimate {id}</h1>
    </div>
  );
}
