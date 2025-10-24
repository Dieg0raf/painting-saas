"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Home, Wrench } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";
import { DescriptionItems } from "./DescriptionItems";

interface ProjectDescriptionProps {
  form: UseFormReturn<EstimateFormData>;
}

export function ProjectDescription({ form }: ProjectDescriptionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <FileText className="w-5 h-5" />
            Description
          </CardTitle>
          <p className="text-sm text-gray-600">
            Describe what work will be done. This helps the customer understand
            exactly what they&apos;re getting.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description Title */}
          <div className="space-y-2">
            <Label
              htmlFor="description.title"
              className="text-base font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Description Title *
            </Label>
            <p className="text-sm text-gray-600">
              A clear, descriptive title for the project (e.g., &quot;Complete
              Kitchen Renovation&quot; or &quot;Bathroom Remodel&quot;)
            </p>
            <Input
              id="description.title"
              {...form.register("description.title")}
              placeholder="e.g., Complete Kitchen Renovation"
              className="text-base"
            />
            {form.formState.errors.description?.title && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {form.formState.errors.description.title.message}
              </p>
            )}
          </div>

          {/* Work Types */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              Type of Work *
            </Label>
            <p className="text-sm text-gray-600">
              Select what type of work this project involves. You can select
              both if it includes both interior and exterior work.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(["exterior", "interior"] as const).map((workType) => (
                <label
                  key={workType}
                  className={`
                    flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${
                      form.watch("description.work_types")?.includes(workType)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    checked={
                      form
                        .watch("description.work_types")
                        ?.includes(workType) || false
                    }
                    onChange={(e) => {
                      const currentTypes =
                        form.watch("description.work_types") || [];
                      if (e.target.checked) {
                        form.setValue("description.work_types", [
                          ...currentTypes,
                          workType,
                        ]);
                      } else {
                        form.setValue(
                          "description.work_types",
                          currentTypes.filter((type) => type !== workType)
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    {workType === "exterior" ? (
                      <Home className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Wrench className="w-5 h-5 text-gray-600" />
                    )}
                    <div>
                      <span className="font-medium capitalize">
                        {workType} Work
                      </span>
                      <p className="text-sm text-gray-600">
                        {workType === "exterior"
                          ? "Work on the outside of the building"
                          : "Work on the inside of the building"}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {form.formState.errors.description?.work_types && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-red-500">⚠</span>
                {form.formState.errors.description.work_types.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Description Items */}
      <DescriptionItems form={form} />
    </div>
  );
}
