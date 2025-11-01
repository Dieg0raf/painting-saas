"use client";
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
