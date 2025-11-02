"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, List } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";
import DescriptionItemRow from "./DescriptionItemRow";
import {
  isArray,
  isValidIndexAndArray,
} from "@/lib/validations/arrayValidation";

interface DescriptionItemsProps {
  form: UseFormReturn<EstimateFormData>;
}

export function DescriptionItems({ form }: DescriptionItemsProps) {
  const items = form.watch("description.items") || [];

  if (!isArray(items, "description.items")) {
    return null;
  }

  const addNewItem = () => {
    const currentItems = form.getValues("description.items") || [];

    if (!isArray(currentItems, "description.items")) {
      return;
    }

    form.setValue("description.items", [
      ...currentItems,
      {
        area: "",
        work_details: [""],
        notes_extras: [""],
      },
    ]);
  };

  const removeItem = (index: number) => {
    const currentItems = form.getValues("description.items") || [];

    if (!isValidIndexAndArray(index, currentItems, "item")) {
      return;
    }

    form.setValue(
      "description.items",
      currentItems.filter((_, i) => i !== index)
    );
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
            className="w-full sm:w-auto min-h-[44px] sm:min-h-0 touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Add new work item"
          >
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Add Item
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
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
              className="min-h-[44px] touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Add your first work item"
            >
              <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
              Add First Item
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((_, index) => (
              <DescriptionItemRow
                key={index}
                form={form}
                index={index}
                onRemove={() => removeItem(index)}
              />
            ))}

            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={addNewItem}
                size="sm"
                className="min-h-[44px] touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Add another work item"
              >
                <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                Add Another Item
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
