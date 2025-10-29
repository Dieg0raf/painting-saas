"use client";
import { Estimate } from "@/app/types/estimates/estimates";
import { useQuery } from "@tanstack/react-query";
import { EditEstimateForm } from "./EditEstimateForm";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import useEditEstimateOperations from "@/app/hooks/useEditEstimateOperations";
import { useEstimate } from "@/app/hooks/useEstimate";

interface EditEstimateClientProps {
  id: string;
}

export function EditEstimateClient({ id }: EditEstimateClientProps) {
  const { estimate, isLoading, error } = useEstimate(id);
  const { saveEstimate, cancelEdit, isSaving } = useEditEstimateOperations(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <EditEstimateForm
      estimate={estimate}
      onSave={saveEstimate}
      onCancel={cancelEdit}
      isSaving={isSaving}
    />
  );
}
export async function fetchEstimate(id: string) {
  console.log("Fetching estimate data for edit page on server with id: ", id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/estimates/${id}`
  );
  if (!res.ok) {
    console.error("Error: ", res.status);
    console.error("Error: ", res.statusText);
    throw new Error("Failed to fetch estimate");
  }
  const data = await res.json();
  if (!data.estimate) {
    console.error("Error: ", data);
    throw new Error("No estimate found");
  }
  return data.estimate;
}
