"use client";
import { useState } from "react";
import { CreateEstimateForm } from "./CreateEstimateForm";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { EstimateFormData } from "@/lib/validations/estimate";
import useCreateEstimateOperations from "@/app/hooks/useCreateEstimateOperations";
import { Customer } from "@/app/types/customers/customers";

export default function CreateEstimateClient() {
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();

  const { createEstimate, cancelCreate, generatePDF, isCreating } =
    useCreateEstimateOperations();

  const handleSave = (data: EstimateFormData) => {
    createEstimate(data);
  };

  const handleCancel = () => {
    cancelCreate();
  };

  const handleGeneratePDF = () => {
    generatePDF();
  };

  return (
    <CreateEstimateForm
      onSave={handleSave}
      onCancel={handleCancel}
      onGeneratePDF={handleGeneratePDF}
      isSaving={isCreating}
      selectedCustomer={selectedCustomer}
    />
  );
}
