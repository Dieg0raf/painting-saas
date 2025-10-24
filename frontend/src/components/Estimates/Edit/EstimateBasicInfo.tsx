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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <FileText className="w-5 h-5" />
          Estimate Details
        </CardTitle>
        <p className="text-sm text-gray-600">
          Basic information about this estimate. These are the main details that
          will appear on the PDF.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Estimate Name */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-base font-medium flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Estimate Name *
          </Label>
          <p className="text-sm text-gray-600">
            Give your estimate a clear, descriptive name (e.g., &quot;Kitchen
            Renovation - Smith Residence&quot;)
          </p>
          <Input
            id="name"
            {...form.register("name")}
            placeholder="e.g., Kitchen Renovation - Smith Residence"
            className="text-base"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span>
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Total Amount */}
        <div className="space-y-2">
          <Label
            htmlFor="total"
            className="text-base font-medium flex items-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Total Amount *
          </Label>
          <p className="text-sm text-gray-600">
            The total cost for this estimate. This will be the main price shown
            to the customer.
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
              $
            </span>
            <Input
              id="total"
              type="number"
              step="0.01"
              {...form.register("total", { valueAsNumber: true })}
              placeholder="0.00"
              className="text-base pl-8"
            />
          </div>
          {form.formState.errors.total && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span className="text-red-500">⚠</span>
              {form.formState.errors.total.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label
            htmlFor="status"
            className="text-base font-medium flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Estimate Status
          </Label>
          <p className="text-sm text-gray-600">
            Track the progress of this estimate. You can change this as the
            estimate moves through your workflow.
          </p>
          <Select
            value={form.watch("status")}
            onValueChange={(value) =>
              form.setValue("status", value as EstimateFormData["status"])
            }
          >
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Select the current status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  Draft - Still working on it
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Pending - Sent to customer, waiting for response
                </div>
              </SelectItem>
              <SelectItem value="accepted">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Accepted - Customer approved the estimate
                </div>
              </SelectItem>
              <SelectItem value="declined">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  Declined - Customer declined the estimate
                </div>
              </SelectItem>
              <SelectItem value="in_progress">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  In Progress - Work has started
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Completed - All work finished
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
