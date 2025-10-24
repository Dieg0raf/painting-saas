"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, List } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";

interface WorkItemsProps {
  form: UseFormReturn<EstimateFormData>;
}

export function WorkItems({ form }: WorkItemsProps) {
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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <List className="w-5 h-5" />
              Work Items
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Break down the work into specific items or areas. This helps
              customers understand exactly what they&apos;re paying for.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewItem}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {itemFields.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No work items yet
            </h3>
            <p className="text-gray-600 mb-4">
              Add specific work items to break down what will be done.
            </p>
            <Button onClick={addNewItem} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {itemFields.map((field, index) => (
              <Card
                key={field.id}
                className="border-l-4 border-l-blue-500 bg-blue-50/30"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <h4 className="font-medium text-gray-900">
                        Work Item {index + 1}
                      </h4>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`items.${index}.area`}
                        className="text-sm font-medium"
                      >
                        Area or Description
                      </Label>
                      <p className="text-xs text-gray-600">
                        Describe what area or type of work this item covers
                        (e.g., &quot;Kitchen Cabinets&quot;, &quot;Bathroom
                        Tile&quot;, &quot;Living Room Paint&quot;)
                      </p>
                      <Input
                        id={`items.${index}.area`}
                        {...form.register(`description.items.${index}.area`)}
                        placeholder="e.g., Kitchen Cabinets"
                        className="text-base"
                      />
                      {form.formState.errors.description?.items?.[index]
                        ?.area && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <span className="text-red-500">⚠</span>
                          {
                            form.formState.errors.description.items[index]?.area
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center pt-4">
              <Button type="button" variant="outline" onClick={addNewItem}>
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
