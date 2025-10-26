"use client";

import { CustomerSnapshot } from "@/app/types/estimates/estimates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Users } from "lucide-react";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLegend,
} from "@/components/ui/field";

interface CustomerInfoProps {
  customer_snapshot: CustomerSnapshot;
}

export function CustomerInfo({ customer_snapshot }: CustomerInfoProps) {
  return (
    <Card
      className="border border-gray-200 bg-gray-50/50"
      role="region"
      aria-labelledby="customer-info-title"
    >
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
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Customer Name */}
            <Field>
              <FieldLegend className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <User className="w-4 h-4" aria-hidden="true" />
                Name
              </FieldLegend>
              <p
                className="text-base font-medium text-gray-900"
                aria-label={`Customer name: ${customer_snapshot.name}`}
              >
                {customer_snapshot.name}
              </p>
            </Field>

            {/* Email */}
            <Field>
              <FieldLegend className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email
              </FieldLegend>
              <p
                className="text-base text-gray-900 break-all"
                aria-label={`Customer email: ${customer_snapshot.email}`}
              >
                {customer_snapshot.email}
              </p>
            </Field>

            {/* Phone */}
            <Field>
              <FieldLegend className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Phone
              </FieldLegend>
              <p
                className="text-base text-gray-900"
                aria-label={`Customer phone: ${customer_snapshot.phone_number}`}
              >
                {customer_snapshot.phone_number}
              </p>
            </Field>

            {/* Address */}
            <Field>
              <FieldLegend className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Address
              </FieldLegend>
              <div
                className="text-base text-gray-900"
                aria-label={`Customer address: ${customer_snapshot.address}, ${customer_snapshot.city}, ${customer_snapshot.state} ${customer_snapshot.zip_code}`}
              >
                <p className="font-medium">{customer_snapshot.address}</p>
                <p className="text-sm text-gray-600">
                  {customer_snapshot.city}, {customer_snapshot.state}{" "}
                  {customer_snapshot.zip_code}
                </p>
              </div>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
