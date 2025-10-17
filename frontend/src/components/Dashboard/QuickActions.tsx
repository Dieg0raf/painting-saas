// components/Dashboard/QuickActions.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Receipt, User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export function QuickActions() {
  const router = useRouter();
  const { t } = useTranslation();

  const actions = [
    {
      title: t("actions.newEstimate"),
      description: "Create a new estimate for a customer",
      icon: FileText,
      onClick: () => router.push("/estimates/new"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t("actions.newInvoice"),
      description: "Generate an invoice from an estimate",
      icon: Receipt,
      onClick: () => router.push("/invoices/new"),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: t("actions.addCustomer"),
      description: "Add a new customer to your database",
      icon: User,
      onClick: () => router.push("/customers/new"),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: t("actions.settings"),
      description: "Manage your account and preferences",
      icon: Settings,
      onClick: () => router.push("/settings"),
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          {t("actions.quickActions")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
              onClick={action.onClick}
            >
              <div className={`p-2 rounded-lg ${action.bgColor} mb-2`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div className="text-left">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
