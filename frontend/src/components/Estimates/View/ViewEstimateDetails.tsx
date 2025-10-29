"use client";
import { Estimate } from "@/app/types/estimates/estimates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Users,
  FileText,
  ClipboardList,
} from "lucide-react";
import { getStatusConfig } from "@/lib/estimateStatus";

interface ViewEstimateDetailsProps {
  estimate: Estimate;
}

export function ViewEstimateDetails({ estimate }: ViewEstimateDetailsProps) {
  const statusConfig = getStatusConfig(estimate.status);
  const StatusIcon = statusConfig.icon;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card role="region" aria-labelledby="customer-info-title">
        <CardHeader className="pb-3">
          <CardTitle
            id="customer-info-title"
            className="flex items-center gap-2 text-gray-900 text-lg"
          >
            <Users className="w-5 h-5 text-blue-600" aria-hidden="true" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                <User className="w-4 h-4" aria-hidden="true" />
                Name
              </div>
              <p className="text-base font-medium text-gray-900">
                {estimate.customer_snapshot.name}
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email
              </div>
              <p className="text-base text-gray-900 break-all">
                {estimate.customer_snapshot.email}
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Phone
              </div>
              <p className="text-base text-gray-900">
                {estimate.customer_snapshot.phone_number}
              </p>
            </div>

            <div className="sm:col-span-2 lg:col-span-4">
              <div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-1">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Address
              </div>
              <div className="text-base text-gray-900">
                <p className="font-medium">
                  {estimate.customer_snapshot.address}
                </p>
                <p className="text-sm text-gray-600">
                  {estimate.customer_snapshot.city},{" "}
                  {estimate.customer_snapshot.state}{" "}
                  {estimate.customer_snapshot.zip_code}
                </p>
                <p className="text-sm text-gray-600">
                  {estimate.customer_snapshot.country}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimate Basic Information */}
      <Card role="region" aria-labelledby="estimate-details-title">
        <CardHeader>
          <CardTitle
            id="estimate-details-title"
            className="flex items-center gap-2 text-gray-900"
          >
            <FileText className="w-5 h-5" aria-hidden="true" />
            Estimate Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Estimate Name
              </div>
              <p className="text-base font-medium text-gray-900">
                {estimate.name}
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Total Amount
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(estimate.total)}
              </p>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Status
              </div>
              <Badge className={statusConfig.className}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Created At
              </div>
              <p className="text-base text-gray-900">
                {formatDate(estimate.created_at)}
              </p>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Updated At
              </div>
              <p className="text-base text-gray-900">
                {formatDate(estimate.updated_at)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Description */}
      {estimate.description && (
        <Card role="region" aria-labelledby="project-description-title">
          <CardHeader>
            <CardTitle
              id="project-description-title"
              className="flex items-center gap-2 text-gray-900"
            >
              <ClipboardList className="w-5 h-5" aria-hidden="true" />
              Project Description
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Title
              </div>
              <p className="text-base text-gray-900">
                {estimate.description.title}
              </p>
            </div>

            {estimate.description.work_types &&
              estimate.description.work_types.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Work Types
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {estimate.description.work_types.map((type, index) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {estimate.description.items &&
              estimate.description.items.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    Work Items
                  </div>
                  <div className="space-y-4">
                    {estimate.description.items.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="font-medium text-gray-900 mb-2">
                          {item.area}
                        </div>
                        {item.work_details && item.work_details.length > 0 && (
                          <div className="mb-2">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              Work Details
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {item.work_details.map((detail, detailIndex) => (
                                <li key={detailIndex}>{detail}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {item.notes_extras && item.notes_extras.length > 0 && (
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              Notes & Extras
                            </div>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {item.notes_extras.map((note, noteIndex) => (
                                <li key={noteIndex}>{note}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {estimate.notes && estimate.notes.length > 0 && (
        <Card role="region" aria-labelledby="notes-title">
          <CardHeader>
            <CardTitle
              id="notes-title"
              className="flex items-center gap-2 text-gray-900"
            >
              <ClipboardList className="w-5 h-5" aria-hidden="true" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {estimate.notes.map((note, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-md text-sm text-gray-900"
                >
                  {note}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
