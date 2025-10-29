"use client";
import { LoadingSpinner } from "@/components/ui/loadingspinner";
import { useEstimate } from "@/app/hooks/useEstimate";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Download } from "lucide-react";
import { ViewEstimateDetails } from "../View/ViewEstimateDetails";
import { useEstimateNavigation } from "@/app/hooks/useEstimateNavigation";

interface ViewEstimateClientProps {
  id: string;
}

export function ViewEstimateClient({ id }: ViewEstimateClientProps) {
  const { estimate, isLoading, error } = useEstimate(id);
  const { editEstimate } = useEstimateNavigation();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error: {error.message}</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  if (!estimate) {
    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Estimate not found</p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    // TODO: Implement PDF export
    console.log("Exporting PDF for estimate:", id);
    // This will be implemented later
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 sm:pb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Estimate Details
          </h1>
          <p className="text-sm text-gray-600 mt-1">Estimate #{estimate.id}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="w-full sm:w-auto sm:min-w-[140px]"
            aria-label="Export estimate as PDF"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            onClick={() => editEstimate(estimate.id)}
            className="w-full sm:w-auto sm:min-w-[140px] bg-blue-600 hover:bg-blue-700"
            aria-label="Edit estimate"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Estimate
          </Button>
        </div>
      </div>

      {/* Estimate Details */}
      <ViewEstimateDetails estimate={estimate} />
    </div>
  );
}
