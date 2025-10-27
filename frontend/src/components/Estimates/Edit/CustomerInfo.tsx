"use client";

import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin, Users } from "lucide-react";
import {
  FieldSet,
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { EstimateFormData } from "@/lib/validations/estimate";

interface CustomerInfoProps {
  form: UseFormReturn<EstimateFormData>;
}

export function CustomerInfo({ form }: CustomerInfoProps) {
  return (
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
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Name */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.name}
            >
              <FieldLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <User className="w-4 h-4" aria-hidden="true" />
                Name *
              </FieldLabel>
              <Input
                id="customer-name"
                {...form.register("customer_snapshot.name")}
                placeholder="John Doe"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.customer_snapshot?.name}
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.name
                    ? [form.formState.errors.customer_snapshot.name]
                    : []
                }
              />
            </Field>

            {/* Email */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.email}
            >
              <FieldLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Mail className="w-4 h-4" aria-hidden="true" />
                Email *
              </FieldLabel>
              <Input
                id="customer-email"
                type="email"
                {...form.register("customer_snapshot.email")}
                placeholder="john@example.com"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.customer_snapshot?.email}
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.email
                    ? [form.formState.errors.customer_snapshot.email]
                    : []
                }
              />
            </Field>

            {/* Phone */}
            <Field
              data-invalid={
                !!form.formState.errors.customer_snapshot?.phone_number
              }
            >
              <FieldLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Phone *
              </FieldLabel>
              <Input
                id="customer-phone"
                type="tel"
                {...form.register("customer_snapshot.phone_number")}
                placeholder="(555) 123-4567"
                className="text-base w-full"
                aria-invalid={
                  !!form.formState.errors.customer_snapshot?.phone_number
                }
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.phone_number
                    ? [form.formState.errors.customer_snapshot.phone_number]
                    : []
                }
              />
            </Field>

            {/* Country */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.country}
            >
              <FieldLabel className="text-sm font-medium text-gray-700">
                Country *
              </FieldLabel>
              <Input
                id="customer-country"
                {...form.register("customer_snapshot.country")}
                placeholder="United States"
                className="text-base w-full"
                aria-invalid={
                  !!form.formState.errors.customer_snapshot?.country
                }
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.country
                    ? [form.formState.errors.customer_snapshot.country]
                    : []
                }
              />
            </Field>

            {/* Address */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.address}
              className="col-span-full"
            >
              <FieldLabel className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Street Address *
              </FieldLabel>
              <Input
                id="customer-address"
                {...form.register("customer_snapshot.address")}
                placeholder="123 Main St"
                className="text-base w-full"
                aria-invalid={
                  !!form.formState.errors.customer_snapshot?.address
                }
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.address
                    ? [form.formState.errors.customer_snapshot.address]
                    : []
                }
              />
            </Field>

            {/* City */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.city}
            >
              <FieldLabel className="text-sm font-medium text-gray-700">
                City *
              </FieldLabel>
              <Input
                id="customer-city"
                {...form.register("customer_snapshot.city")}
                placeholder="Concord"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.customer_snapshot?.city}
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.city
                    ? [form.formState.errors.customer_snapshot.city]
                    : []
                }
              />
            </Field>

            {/* State */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.state}
            >
              <FieldLabel className="text-sm font-medium text-gray-700">
                State *
              </FieldLabel>
              <Input
                id="customer-state"
                {...form.register("customer_snapshot.state")}
                placeholder="CA"
                className="text-base w-full"
                aria-invalid={!!form.formState.errors.customer_snapshot?.state}
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.state
                    ? [form.formState.errors.customer_snapshot.state]
                    : []
                }
              />
            </Field>

            {/* Zip Code */}
            <Field
              data-invalid={!!form.formState.errors.customer_snapshot?.zip_code}
            >
              <FieldLabel className="text-sm font-medium text-gray-700">
                Zip Code *
              </FieldLabel>
              <Input
                id="customer-zip"
                {...form.register("customer_snapshot.zip_code")}
                placeholder="94520"
                className="text-base w-full"
                aria-invalid={
                  !!form.formState.errors.customer_snapshot?.zip_code
                }
              />
              <FieldError
                errors={
                  form.formState.errors.customer_snapshot?.zip_code
                    ? [form.formState.errors.customer_snapshot.zip_code]
                    : []
                }
              />
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
}
