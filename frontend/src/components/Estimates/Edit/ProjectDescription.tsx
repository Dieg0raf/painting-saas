"use client";

import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Home, Wrench } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";
import { DescriptionItems } from "./DescriptionItems";
import { FieldSet, Field, FieldLabel, FieldError } from "@/components/ui/field";

interface ProjectDescriptionProps {
  form: UseFormReturn<EstimateFormData>;
}

export function ProjectDescription({ form }: ProjectDescriptionProps) {
  return (
    <div className="space-y-6">
      <Card role="region" aria-labelledby="project-description-title">
        <CardHeader>
          <CardTitle
            id="project-description-title"
            className="flex items-center gap-2 text-gray-900"
          >
            <FileText className="w-5 h-5" aria-hidden="true" />
            Project Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FieldSet>
            {/* Description Title */}
            <Field data-invalid={!!form.formState.errors.description?.title}>
              <FieldLabel
                htmlFor="description.title"
                className="text-sm font-medium text-gray-700"
              >
                Project Title *
              </FieldLabel>
              <Input
                id="description.title"
                {...form.register("description.title")}
                placeholder="Complete Kitchen Renovation"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.description?.title}
              />
              <FieldError
                errors={
                  form.formState.errors.description?.title
                    ? [form.formState.errors.description.title]
                    : []
                }
              />
            </Field>

            {/* Work Types */}
            <Field
              data-invalid={!!form.formState.errors.description?.work_types}
            >
              <FieldLabel className="text-sm font-medium text-gray-700">
                Work Type *
              </FieldLabel>
              <fieldset>
                <legend className="sr-only">Select work types</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(["exterior", "interior"] as const).map((workType) => (
                    <div
                      key={workType}
                      className={`
                        flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors focus-within:ring-2 focus-within:ring-blue-500
                        ${
                          form
                            .watch("description.work_types")
                            ?.includes(workType)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }
                      `}
                    >
                      <Checkbox
                        id={`work-type-${workType}`}
                        checked={
                          form
                            .watch("description.work_types")
                            ?.includes(workType) || false
                        }
                        onCheckedChange={(checked) => {
                          const currentTypes =
                            form.watch("description.work_types") || [];
                          if (checked) {
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
                        aria-describedby={`work-type-${workType}-description`}
                      />
                      <FieldLabel
                        htmlFor={`work-type-${workType}`}
                        className="flex items-center gap-2 cursor-pointer flex-1"
                      >
                        {workType === "exterior" ? (
                          <Home
                            className="w-4 h-4 text-gray-600"
                            aria-hidden="true"
                          />
                        ) : (
                          <Wrench
                            className="w-4 h-4 text-gray-600"
                            aria-hidden="true"
                          />
                        )}
                        <span className="font-medium capitalize text-sm">
                          {workType} Work
                        </span>
                      </FieldLabel>
                      <span
                        id={`work-type-${workType}-description`}
                        className="sr-only"
                      >
                        {workType === "exterior"
                          ? "Work on the outside of the building"
                          : "Work on the inside of the building"}
                      </span>
                    </div>
                  ))}
                </div>
              </fieldset>
              <FieldError
                errors={
                  form.formState.errors.description?.work_types
                    ? [form.formState.errors.description.work_types]
                    : []
                }
              />
            </Field>
          </FieldSet>
        </CardContent>
      </Card>

      {/* Description Items */}
      <DescriptionItems form={form} />
    </div>
  );
}
