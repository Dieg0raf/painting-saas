"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, List } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";

interface DescriptionItemsProps {
  form: UseFormReturn<EstimateFormData>;
}

export function DescriptionItems({ form }: DescriptionItemsProps) {
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control: form.control,
    name: "description.items",
  });

  const addNewItem = () => {
    appendItem({
      area: "",
      work_details: [],
      notes_extras: [],
    });
  };

  return (
    <Card role="region" aria-labelledby="work-items-title">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle
            id="work-items-title"
            className="flex items-center gap-2 text-gray-900"
          >
            <List className="w-5 h-5" aria-hidden="true" />
            Work Items
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewItem}
            className="w-full sm:w-auto"
            aria-label="Add new work item"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {itemFields.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <List
              className="w-8 h-8 text-gray-400 mx-auto mb-3"
              aria-hidden="true"
            />
            <h3 className="text-base font-medium text-gray-900 mb-2">
              No work items yet
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add specific work items to break down the project.
            </p>
            <Button
              onClick={addNewItem}
              variant="outline"
              size="sm"
              aria-label="Add your first work item"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {itemFields.map((field, index) => (
              <Card
                key={field.id}
                className="border border-gray-200"
                role="group"
                aria-labelledby={`item-${index + 1}-title`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium"
                        aria-hidden="true"
                      >
                        {index + 1}
                      </div>
                      <h4
                        id={`item-${index + 1}-title`}
                        className="text-base font-medium text-gray-900"
                      >
                        Item {index + 1}
                      </h4>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      aria-label={`Remove item ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Area */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Area
                      </Label>
                      <Input
                        {...form.register(`description.items.${index}.area`)}
                        placeholder="Kitchen Cabinets"
                        className="text-base w-full"
                        aria-describedby={
                          form.formState.errors.description?.items?.[index]
                            ?.area
                            ? `area-error-${index}`
                            : undefined
                        }
                        aria-invalid={
                          !!form.formState.errors.description?.items?.[index]
                            ?.area
                        }
                      />
                      {form.formState.errors.description?.items?.[index]
                        ?.area && (
                        <p
                          id={`area-error-${index}`}
                          className="text-sm text-red-600"
                          role="alert"
                        >
                          {
                            form.formState.errors.description.items[index]?.area
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {/* Work Details */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Work Details
                      </Label>
                      <Textarea
                        {...form.register(
                          `description.items.${index}.work_details.0`
                        )}
                        placeholder="Describe the work to be done..."
                        className="min-h-[80px] text-base resize-none w-full"
                        aria-label={`Work details for item ${index + 1}`}
                      />
                    </div>

                    {/* Extra Notes */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Notes
                      </Label>
                      <Textarea
                        {...form.register(
                          `description.items.${index}.notes_extras.0`
                        )}
                        placeholder="Special requirements..."
                        className="min-h-[80px] text-base resize-none w-full"
                        aria-label={`Notes for item ${index + 1}`}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={addNewItem}
                size="sm"
                aria-label="Add another work item"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Item
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
