"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Estimate } from "@/app/types/estimates/estimates";
import { EstimatesStats } from "./EstimatesStats";
import { MobileEstimatesList } from "./MobileEstimatesList";
import { DesktopEstimatesTable } from "./DesktopEstimatesTable";
import { LoadingSpinner } from "../ui/loadingspinner";
import { useRouter } from "next/navigation";
import { useEstimateNavigation } from "@/app/hooks/useEstimateNavigation";

// Status configuration for consistent styling
export const getStatusConfig = (status: string) => {
  switch (status) {
    case "draft":
      return {
        label: "Draft",
        icon: FileText,
        className: "bg-gray-100 text-gray-800",
        description: "Not yet sent to customer",
      };
    case "pending":
      return {
        label: "Pending",
        icon: Clock,
        className: "bg-yellow-100 text-yellow-800",
        description: "Waiting for customer response",
      };
    case "accepted":
      return {
        label: "Accepted",
        icon: CheckCircle,
        className: "bg-green-100 text-green-800",
        description: "Customer has accepted",
      };
    case "declined":
      return {
        label: "Declined",
        icon: XCircle,
        className: "bg-red-100 text-red-800",
        description: "Customer has declined",
      };
    case "completed":
      return {
        label: "Completed",
        icon: CheckCircle,
        className: "bg-blue-100 text-blue-800",
        description: "Project completed",
      };
    case "in_progress":
      return {
        label: "In Progress",
        icon: Clock,
        className: "bg-purple-100 text-purple-800",
        description: "Work in progress",
      };
    default:
      return {
        label: "Unknown",
        icon: AlertCircle,
        className: "bg-gray-100 text-gray-800",
        description: "Status unknown",
      };
  }
};

export function EstimatesPage() {
  // TODO: Figure out if cacheing is working correctly
  const { data, isLoading, error } = useQuery<Estimate[]>({
    queryKey: ["estimates"],
    queryFn: fetchEstimates,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { viewEstimate, editEstimate, duplicateEstimate, deleteEstimate } =
    useEstimateNavigation();

  async function fetchEstimates() {
    // TODO: Add filtering and pagination
    const res = await fetch("/api/estimates");
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Couldn't fetch estimates");
    }

    if (!data.estimates) {
      throw new Error("No Estimate field inside of data request");
    }

    return data.estimates;
  }

  const estimates: Estimate[] = data || [];

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const year = date.getUTCFullYear();
    const monthIndex = date.getUTCMonth();
    const day = date.getUTCDate();

    const monthShortNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${monthShortNames[monthIndex]} ${day}, ${year}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center text-center">
            <LoadingSpinner className="mb-2" />
            <p className="text-gray-600">Loading estimates...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Error Loading Estimates
            </h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      {/* Skip link for screen readers */}
      <a
        href="#estimates-table"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to estimates table
      </a>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Estimates
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Manage your project estimates and track customer responses
          </p>
        </div>
        <Button className="w-full sm:w-auto" aria-label="Create new estimate">
          <Plus className="h-4 w-4 mr-2" />
          New Estimate
        </Button>
      </div>

      {/* Stats Cards */}
      <EstimatesStats estimates={estimates} />

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estimates ({estimates.length})
          </CardTitle>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {estimates.length === 0
              ? "No estimates found"
              : `Showing ${estimates.length} estimate${
                  estimates.length === 1 ? "" : "s"
                }`}
          </div>
        </CardHeader>
        <CardContent>
          {estimates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No estimates found
              </h3>
              <p className="text-gray-500 mb-4">
                Get started by creating your first estimate
              </p>
            </div>
          ) : (
            <>
              {/* Mobile Card Layout */}
              <MobileEstimatesList
                estimates={estimates}
                onView={viewEstimate}
                onEdit={editEstimate}
                onDelete={deleteEstimate}
                onDuplicate={duplicateEstimate}
                getStatusConfig={getStatusConfig}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
              />

              {/* Desktop Table Layout */}
              <DesktopEstimatesTable
                estimates={estimates}
                onView={viewEstimate}
                onEdit={editEstimate}
                onDelete={deleteEstimate}
                onDuplicate={duplicateEstimate}
                getStatusConfig={getStatusConfig}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
