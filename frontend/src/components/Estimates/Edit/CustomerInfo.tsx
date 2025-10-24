"use client";

import { Customer } from "@/app/types/customers/customers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, Users } from "lucide-react";

interface CustomerInfoProps {
  customer: Customer;
}

export function CustomerInfo({ customer }: CustomerInfoProps) {
  return (
    <Card className="border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-blue-900 text-xl">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          Customer Information
        </CardTitle>
        <p className="text-blue-800 font-medium">
          This estimate is prepared for the customer below. Customer details
          cannot be modified here.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Customer Name */}
          <div className="space-y-3 bg-white/60 rounded-lg p-4">
            <Label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <User className="w-4 h-4" />
              Customer Name
            </Label>
            <p className="text-lg font-bold text-gray-900 break-words">
              {customer.name}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-3 bg-white/60 rounded-lg p-4">
            <Label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <p className="text-base text-gray-900 break-all">
              {customer.email}
            </p>
          </div>

          {/* Phone */}
          <div className="space-y-3 bg-white/60 rounded-lg p-4">
            <Label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </Label>
            <p className="text-base text-gray-900">{customer.phone_number}</p>
          </div>

          {/* Address */}
          <div className="space-y-3 bg-white/60 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
            <Label className="text-sm font-semibold text-blue-800 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </Label>
            <div className="text-base text-gray-900 space-y-1">
              <p className="font-medium">{customer.address}</p>
              <p>
                {customer.city}, {customer.state} {customer.zip_code}
              </p>
              <p className="text-sm text-gray-600">{customer.country}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
