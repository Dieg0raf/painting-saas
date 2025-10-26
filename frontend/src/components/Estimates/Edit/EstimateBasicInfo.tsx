"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { getStatusConfig, ALL_STATUSES } from "@/lib/estimateStatus";

interface EstimateBasicInfoProps {
  form: UseFormReturn<EstimateFormData>;
}

export function EstimateBasicInfo({ form }: EstimateBasicInfoProps) {
  return (
    <Card role="region" aria-labelledby="estimate-details-title">
      <CardHeader>
        <CardTitle
          id="estimate-details-title"
          className="flex items-center gap-2 text-gray-900"
        >
          <FileText className="w-5 h-5" aria-hidden="true" />
          Estimate Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Estimate Name */}
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Estimate Name *
              </FieldLabel>
              <Input
                id="name"
                {...form.register("name")}
                placeholder="Kitchen Renovation - Smith Residence"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.name}
              />
              <FieldError
                errors={
                  form.formState.errors.name ? [form.formState.errors.name] : []
                }
              />
            </Field>

            {/* Total Amount */}
            <Field data-invalid={!!form.formState.errors.total}>
              <FieldLabel
                htmlFor="total"
                className="text-sm font-medium text-gray-700"
              >
                Total Amount *
              </FieldLabel>
              <div className="relative">
                <span
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  aria-hidden="true"
                >
                  $
                </span>
                <Input
                  id="total"
                  type="number"
                  step="0.01"
                  {...form.register("total", { valueAsNumber: true })}
                  placeholder="0.00"
                  className="text-base pl-8 w-full"
                  aria-invalid={!!form.formState.errors.total}
                />
              </div>
              <FieldError
                errors={
                  form.formState.errors.total
                    ? [form.formState.errors.total]
                    : []
                }
              />
            </Field>
          </FieldGroup>

          {/* Status */}
          <Field>
            <FieldLabel
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status
            </FieldLabel>
            <Select
              value={form.watch("status")}
              onValueChange={(value) =>
                form.setValue("status", value as EstimateFormData["status"])
              }
            >
              <SelectTrigger
                className="text-base w-full"
                aria-label="Select estimate status"
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {ALL_STATUSES.map((status) => {
                  const config = getStatusConfig(status);

                  return (
                    <SelectItem key={status} value={status}>
                      <div className="flex items-center gap-2">
                        <config.icon
                          className={`w-4 h-4 ${config.className} rounded-full`}
                          aria-hidden="true"
                        />
                        {config.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </Field>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
