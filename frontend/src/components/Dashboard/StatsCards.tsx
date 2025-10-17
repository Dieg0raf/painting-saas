// components/Dashboard/StatsCards.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Receipt, DollarSign, Clock } from "lucide-react";

export function StatsCards() {
  // Mock data - replace with real data from your API
  const stats = [
    {
      title: "Total Estimates",
      value: "24",
      change: "+12%",
      changeType: "positive" as const,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Estimates",
      value: "8",
      change: "+2",
      changeType: "neutral" as const,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Total Invoices",
      value: "156",
      change: "+8%",
      changeType: "positive" as const,
      icon: Receipt,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Revenue This Month",
      value: "$12,450",
      change: "+15%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center pt-1">
              <Badge
                variant={
                  stat.changeType === "positive" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-gray-500 ml-2">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
