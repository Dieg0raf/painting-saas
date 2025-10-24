"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, StickyNote } from "lucide-react";
import { EstimateFormData } from "@/lib/validations/estimate";

interface AdditionalNotesProps {
  form: UseFormReturn<EstimateFormData>;
}

export function AdditionalNotes({ form }: AdditionalNotesProps) {
  const {
    fields: notesFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control: form.control,
    name: "description.items",
  });

  const addNewNote = () => {
    appendNote({
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
              <StickyNote className="w-5 h-5" />
              Additional Notes
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Add any extra information, special instructions, or important
              details for this estimate.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addNewNote}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {notesFields.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <StickyNote className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notes added yet
            </h3>
            <p className="text-gray-600 mb-4">
              Add any special instructions, terms, or important details for this
              estimate.
            </p>
            <Button onClick={addNewNote} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Note
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {notesFields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <Label className="text-sm font-medium text-gray-700">
                      Note {index + 1}
                    </Label>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNote(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  {...form.register(`notes.${index}`)}
                  placeholder="Enter additional note... (e.g., 'Work to be completed within 30 days', 'Customer to provide materials', etc.)"
                  className="min-h-[100px] text-base resize-none"
                />
              </div>
            ))}

            <div className="flex justify-center pt-4">
              <Button type="button" variant="outline" onClick={addNewNote}>
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
