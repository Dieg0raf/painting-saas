"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, DollarSign, CheckCircle } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Estimate Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Estimate Name *
            </Label>
            <Input
              id="name"
              {...form.register("name")}
              placeholder="Kitchen Renovation - Smith Residence"
              className="text-base w-full"
              aria-describedby={
                form.formState.errors.name ? "name-error" : undefined
              }
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <p id="name-error" className="text-sm text-red-600" role="alert">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Total Amount */}
          <div className="space-y-2">
            <Label
              htmlFor="total"
              className="text-sm font-medium text-gray-700"
            >
              Total Amount *
            </Label>
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
                aria-describedby={
                  form.formState.errors.total ? "total-error" : undefined
                }
                aria-invalid={!!form.formState.errors.total}
              />
            </div>
            {form.formState.errors.total && (
              <p id="total-error" className="text-sm text-red-600" role="alert">
                {form.formState.errors.total.message}
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
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
              <SelectItem value="draft">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    aria-hidden="true"
                  ></div>
                  Draft
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-yellow-400 rounded-full"
                    aria-hidden="true"
                  ></div>
                  Pending
                </div>
              </SelectItem>
              <SelectItem value="accepted">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    aria-hidden="true"
                  ></div>
                  Accepted
                </div>
              </SelectItem>
              <SelectItem value="declined">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-red-400 rounded-full"
                    aria-hidden="true"
                  ></div>
                  Declined
                </div>
              </SelectItem>
              <SelectItem value="in_progress">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    aria-hidden="true"
                  ></div>
                  In Progress
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 bg-green-600 rounded-full"
                    aria-hidden="true"
                  ></div>
                  Completed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
