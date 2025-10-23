"use client";
import { useParams } from "next/navigation";

export default function ViewEstimatePage() {
  const { id } = useParams();
  console.log(`Viewing estimate ${id}`);
  return (
    <div>
      <h1>View Estimate {id}</h1>
    </div>
  );
}
