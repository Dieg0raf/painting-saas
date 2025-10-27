"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Save, X, FileText } from "lucide-react";
import {
  EditEstimateFormSchema,
  EstimateFormData,
} from "@/lib/validations/estimate";
import { Customer } from "@/app/types/customers/customers";
import { CustomerInfo } from "../Edit/CustomerInfo";
import { EstimateBasicInfo } from "../Edit/EstimateBasicInfo";
import { ProjectDescription } from "../Edit/ProjectDescription";
import { EstimateNotes } from "../Edit/EstimateNotes";
import { FieldSet, FieldGroup } from "@/components/ui/field";

interface CreateEstimateFormProps {
  onSave: (data: EstimateFormData) => void;
  onCancel: () => void;
  onGeneratePDF: () => void;
  isSaving: boolean;
  selectedCustomer?: Customer;
}

export function CreateEstimateForm({
  onSave,
  onCancel,
  onGeneratePDF,
  isSaving,
  selectedCustomer,
}: CreateEstimateFormProps) {
  const form = useForm<EstimateFormData>({
    resolver: zodResolver(EditEstimateFormSchema),
    defaultValues: {
      name: "",
      total: 0,
      status: "draft",
      notes: [],
      customer_snapshot: selectedCustomer
        ? {
            name: selectedCustomer.name || "",
            email: selectedCustomer.email || "",
            phone_number: selectedCustomer.phone_number || "",
            address: selectedCustomer.address || "",
            city: selectedCustomer.city || "",
            state: selectedCustomer.state || "",
            zip_code: selectedCustomer.zip_code || "",
            country: selectedCustomer.country || "",
          }
        : {
            name: "",
            email: "",
            phone_number: "",
            address: "",
            city: "",
            state: "",
            zip_code: "",
            country: "",
          },
      description: {
        title: "",
        work_types: [],
        items: [],
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: EstimateFormData) => {
    console.log("Creating estimate with data: ", data);
    onSave(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Create New Estimate
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto sm:flex-shrink-0">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto sm:min-w-[100px] order-3 sm:order-1"
              aria-label="Cancel creating estimate"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          {onGeneratePDF && (
            <Button
              variant="outline"
              onClick={onGeneratePDF}
              className="w-full sm:w-auto sm:min-w-[120px] order-2 sm:order-2"
              aria-label="Generate PDF preview"
            >
              <FileText className="w-4 h-4 mr-2" />
              Preview PDF
            </Button>
          )}
          <Button
            type="submit"
            form="estimate-form"
            disabled={isSaving}
            className="w-full sm:w-auto sm:min-w-[140px] bg-blue-600 hover:bg-blue-700 order-1 sm:order-3"
            aria-label={isSaving ? "Creating estimate..." : "Create estimate"}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Creating..." : "Create Estimate"}
          </Button>
        </div>
      </div>

      <form
        id="estimate-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FieldSet>
          <FieldGroup>
            {/* 1. Customer Information - Always first and prominent */}
            <CustomerInfo form={form} />

            {/* 2. Estimate Basic Information */}
            <EstimateBasicInfo form={form} />

            {/* 3. Description with items */}
            <ProjectDescription form={form} />

            {/* 4. Estimate Notes */}
            <EstimateNotes form={form} />
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
}
