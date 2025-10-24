"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, List, FileText, Wrench, StickyNote } from "lucide-react";
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

  console.log("itemFields", itemFields);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <List className="w-5 h-5" />
              Description Items
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Break down the work into specific items with detailed
              descriptions.
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
      <CardContent className="space-y-6">
        {itemFields.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No description items yet
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
          <div className="space-y-6">
            {itemFields.map((field, index) => (
              <Card
                key={field.id}
                className="border-l-4 border-l-green-500 bg-green-50/30"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Description Item {index + 1}
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

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Area */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        Area
                      </Label>
                      <p className="text-xs text-gray-600">
                        What area or type of work (e.g., &quot;Kitchen
                        Cabinets&quot;, &quot;Bathroom Tile&quot;)
                      </p>
                      <Input
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

                    {/* Work Details */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-blue-600" />
                        Work Details
                      </Label>
                      <p className="text-xs text-gray-600">
                        Specific tasks or work to be performed
                      </p>
                      <Textarea
                        {...form.register(
                          `description.items.${index}.work_details.0`
                        )}
                        placeholder="Describe the specific work to be done..."
                        className="min-h-[100px] text-base resize-none"
                      />
                    </div>

                    {/* Extra Notes */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <StickyNote className="w-4 h-4 text-orange-600" />
                        Extra Notes
                      </Label>
                      <p className="text-xs text-gray-600">
                        Additional information or special requirements
                      </p>
                      <Textarea
                        {...form.register(
                          `description.items.${index}.notes_extras.0`
                        )}
                        placeholder="Any special notes or requirements..."
                        className="min-h-[100px] text-base resize-none"
                      />
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
