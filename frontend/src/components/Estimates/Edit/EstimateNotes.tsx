"use client";

import { FieldArrayPath, UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, StickyNote } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";

interface EstimateNotesProps {
  form: UseFormReturn<EstimateFormData>;
}

export function EstimateNotes({ form }: EstimateNotesProps) {
  const {
    fields: notesFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control: form.control,
    name: "notes" as FieldArrayPath<EstimateFormData["notes"]>,
  });

  const addNewNote = () => {
    appendNote("");
  };

  return (
    <Card role="region" aria-labelledby="notes-title">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle
            id="notes-title"
            className="flex items-center gap-2 text-gray-900"
          >
            <StickyNote className="w-5 h-5" aria-hidden="true" />
            Additional Notes
          </CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewNote}
            className="w-full sm:w-auto"
            aria-label="Add new note"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notesFields.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <StickyNote
              className="w-8 h-8 text-gray-400 mx-auto mb-3"
              aria-hidden="true"
            />
            <h3 className="text-base font-medium text-gray-900 mb-2">
              No notes yet
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Add special instructions or important details.
            </p>
            <Button
              onClick={addNewNote}
              variant="outline"
              size="sm"
              aria-label="Add your first note"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Note
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {notesFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-3"
                role="group"
                aria-labelledby={`note-${index + 1}-title`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-medium"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </div>
                    <Label
                      id={`note-${index + 1}-title`}
                      className="text-sm font-medium text-gray-700"
                    >
                      Note {index + 1}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNote(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    aria-label={`Remove note ${index + 1}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  {...form.register(`notes.${index}`)}
                  placeholder="Enter note (e.g., 'Work to be completed within 30 days')"
                  className="min-h-[80px] text-base resize-none w-full"
                  aria-label={`Note ${index + 1} content`}
                />
              </div>
            ))}

            <div className="flex justify-center pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={addNewNote}
                size="sm"
                aria-label="Add another note"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Note
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
