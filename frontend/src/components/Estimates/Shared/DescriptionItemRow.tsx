import { UseFormReturn } from "react-hook-form";
import { EstimateFormData } from "@/lib/validations/estimate";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  isArray,
  isValidIndex,
  isValidIndexAndArray,
} from "@/lib/validations/arrayValidation";

interface DescriptionItemRowProps {
  form: UseFormReturn<EstimateFormData>;
  index: number;
  onRemove: () => void;
}

export default function DescriptionItemRow({
  form,
  index,
  onRemove,
}: DescriptionItemRowProps) {
  const items = form.watch("description.items") || [];

  if (!isValidIndexAndArray(index, items, "item")) {
    return null;
  }

  const currentItem = items[index];
  const workDetails = currentItem?.work_details || [];
  const notesExtras = currentItem?.notes_extras || [];

  const addWorkDetail = () => {
    const currentItems = form.getValues("description.items") || [];

    if (!isValidIndexAndArray(index, currentItems, "item")) {
      return;
    }

    const currentWorkDetails = currentItems[index]?.work_details || [];

    if (!isArray(currentWorkDetails, `work_details for item ${index}`)) {
      return;
    }

    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      work_details: [...currentWorkDetails, ""],
    };
    form.setValue("description.items", updatedItems);
  };

  const removeWorkDetail = (workIndex: number) => {
    const currentItems = form.getValues("description.items") || [];

    if (!isValidIndexAndArray(index, currentItems, "item")) {
      return;
    }

    const currentWorkDetails = currentItems[index]?.work_details || [];

    if (!isArray(currentWorkDetails, `work_details for item ${index}`)) {
      return;
    }

    if (!isValidIndex(workIndex, currentWorkDetails.length, "work detail")) {
      return;
    }

    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      work_details: currentWorkDetails.filter((_, i) => i !== workIndex),
    };
    form.setValue("description.items", updatedItems);
  };

  const addNote = () => {
    const currentItems = form.getValues("description.items") || [];

    if (!isValidIndexAndArray(index, currentItems, "item")) {
      return;
    }

    const currentNotes = currentItems[index]?.notes_extras || [];

    if (!isArray(currentNotes, `notes_extras for item ${index}`)) {
      return;
    }

    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      notes_extras: [...currentNotes, ""],
    };
    form.setValue("description.items", updatedItems);
  };

  const removeNote = (noteIndex: number) => {
    const currentItems = form.getValues("description.items") || [];

    if (!isValidIndexAndArray(index, currentItems, "item")) {
      return;
    }

    const currentNotes = currentItems[index]?.notes_extras || [];

    if (!isArray(currentNotes, `notes_extras for item ${index}`)) {
      return;
    }

    if (!isValidIndex(noteIndex, currentNotes.length, "note")) {
      return;
    }

    const updatedItems = [...currentItems];
    updatedItems[index] = {
      ...updatedItems[index],
      notes_extras: currentNotes.filter((_, i) => i !== noteIndex),
    };
    form.setValue("description.items", updatedItems);
  };

  return (
    <Card
      className="border border-gray-200 hover:border-gray-300 transition-colors group"
      role="group"
      aria-labelledby={`item-${index + 1}-title`}
    >
      <CardContent className="pt-4 sm:pt-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-xs font-medium shrink-0"
              aria-hidden="true"
            >
              {index + 1}
            </div>
            <h4
              id={`item-${index + 1}-title`}
              className="text-base sm:text-base font-medium text-gray-900"
            >
              Item {index + 1}
            </h4>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 h-10 w-10 sm:h-8 sm:w-8 p-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 touch-manipulation"
            aria-label={`Remove item ${index + 1}`}
          >
            <Trash2 className="w-5 h-5 sm:w-4 sm:h-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">Area</Label>
              <div className="h-7"></div>
            </div>
            <Input
              {...form.register(`description.items.${index}.area`)}
              placeholder="Kitchen Cabinets"
              className="text-base sm:text-base w-full min-h-[44px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-describedby={
                form.formState.errors.description?.items?.[index]?.area
                  ? `area-error-${index}`
                  : undefined
              }
              aria-invalid={
                !!form.formState.errors.description?.items?.[index]?.area
              }
            />
            {form.formState.errors.description?.items?.[index]?.area && (
              <p
                id={`area-error-${index}`}
                className="text-sm text-red-600"
                role="alert"
              >
                {form.formState.errors.description.items[index]?.area?.message}
              </p>
            )}
          </div>

          {/* Work Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">
                Work Details
              </Label>
              {workDetails.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addWorkDetail}
                  className="h-9 sm:h-7 px-3 sm:px-2 text-sm sm:text-xs text-gray-600 hover:text-gray-900 active:bg-gray-100 min-h-[44px] sm:min-h-0 touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Add work detail"
                >
                  <Plus
                    className="w-4 h-4 sm:w-3 sm:h-3 mr-1.5 sm:mr-1"
                    aria-hidden="true"
                  />
                  <span className="sm:hidden">Add Detail</span>
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {workDetails.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addWorkDetail}
                  className="w-full border-dashed min-h-[44px] touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Add work detail"
                >
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  Add Work Detail
                </Button>
              ) : (
                workDetails.map((_, workIndex) => (
                  <div key={workIndex} className="relative group/detail">
                    <Textarea
                      {...form.register(
                        `description.items.${index}.work_details.${workIndex}`
                      )}
                      placeholder={`Work detail ${workIndex + 1}...`}
                      className="min-h-[80px] sm:min-h-[60px] text-base resize-none pr-12 sm:pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label={`Work detail ${workIndex + 1} for item ${
                        index + 1
                      }`}
                    />
                    {workDetails.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkDetail(workIndex)}
                        className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover/detail:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 h-9 w-9 sm:h-7 sm:w-7 p-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 touch-manipulation focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`Remove work detail ${workIndex + 1}`}
                      >
                        <Trash2
                          className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Extra Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-gray-700">Notes</Label>
              {notesExtras.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addNote}
                  className="h-9 sm:h-7 px-3 sm:px-2 text-sm sm:text-xs text-gray-600 hover:text-gray-900 active:bg-gray-100 min-h-[44px] sm:min-h-0 touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Add note"
                >
                  <Plus
                    className="w-4 h-4 sm:w-3 sm:h-3 mr-1.5 sm:mr-1"
                    aria-hidden="true"
                  />
                  <span className="sm:hidden">Add Note</span>
                  <span className="hidden sm:inline">Add</span>
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {notesExtras.length === 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addNote}
                  className="w-full border-dashed min-h-[44px] touch-manipulation focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Add note"
                >
                  <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                  Add Note
                </Button>
              ) : (
                notesExtras.map((_, noteIndex) => (
                  <div key={noteIndex} className="relative group/note">
                    <Textarea
                      {...form.register(
                        `description.items.${index}.notes_extras.${noteIndex}`
                      )}
                      placeholder={`Note ${noteIndex + 1}...`}
                      className="min-h-[80px] sm:min-h-[60px] text-base resize-none pr-12 sm:pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      aria-label={`Note ${noteIndex + 1} for item ${index + 1}`}
                    />
                    {notesExtras.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeNote(noteIndex)}
                        className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover/note:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50 active:bg-red-100 h-9 w-9 sm:h-7 sm:w-7 p-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 touch-manipulation focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={`Remove note ${noteIndex + 1}`}
                      >
                        <Trash2
                          className="w-4 h-4 sm:w-3.5 sm:h-3.5"
                          aria-hidden="true"
                        />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
