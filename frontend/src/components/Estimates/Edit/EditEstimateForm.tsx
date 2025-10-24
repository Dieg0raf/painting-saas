"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import {
  EditEstimateFormSchema,
  EstimateFormData,
} from "@/lib/validations/estimate";
import { Estimate } from "@/app/types/estimates/estimates";
import { CustomerInfo } from "./CustomerInfo";
import { EstimateBasicInfo } from "./EstimateBasicInfo";
import { ProjectDescription } from "./ProjectDescription";
import { EstimateNotes } from "./EstimateNotes";

interface EditEstimateFormProps {
  estimate: Estimate;
  onSave?: (data: EstimateFormData) => void;
  onCancel?: () => void;
}

export function EditEstimateForm({
  estimate,
  onSave,
  onCancel,
}: EditEstimateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EstimateFormData>({
    resolver: zodResolver(EditEstimateFormSchema),
    defaultValues: {
      name: estimate.name,
      total: estimate.total,
      status: estimate.status,
      notes: estimate.notes || [],
      description: {
        title: estimate.description?.title || "",
        work_types: estimate.description?.work_types || [],
        items: estimate.description?.items || [],
      },
    },
    mode: "onChange",
  });

  const onSubmit = async (data: EstimateFormData) => {
    setIsSubmitting(true);
    try {
      if (onSave) {
        await onSave(data);
      }
    } catch (error) {
      console.error("Error saving estimate:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Edit Estimate
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:flex-shrink-0">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto sm:min-w-[100px] order-2 sm:order-1"
              aria-label="Cancel editing and discard changes"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            form="estimate-form"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:min-w-[140px] bg-blue-600 hover:bg-blue-700 order-1 sm:order-2"
            aria-label={
              isSubmitting ? "Saving changes..." : "Save changes to estimate"
            }
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <form
        id="estimate-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* 1. Customer Information - Always first and prominent */}
        <CustomerInfo customer={estimate.customer} />

        {/* 2. Estimate Basic Information */}
        <EstimateBasicInfo form={form} />

        {/* 3. Description with items */}
        <ProjectDescription form={form} />

        {/* 4. Estimate Notes */}
        <EstimateNotes form={form} />
      </form>
    </div>
  );
}
