"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  Receipt,
  User,
} from "lucide-react";

export function RecentActivity() {
  // Mock data - replace with real data from your API
  const recentItems = [
    {
      id: 1,
      type: "estimate",
      title: "Kitchen Renovation - Smith Residence",
      customer: "John Smith",
      amount: "$15,500",
      status: "pending",
      date: "2 hours ago",
      icon: FileText,
    },
    {
      id: 2,
      type: "invoice",
      title: "Bathroom Remodel - Johnson Family",
      customer: "Sarah Johnson",
      amount: "$8,200",
      status: "paid",
      date: "1 day ago",
      icon: Receipt,
    },
    {
      id: 3,
      type: "customer",
      title: "New Customer Added",
      customer: "Mike Wilson",
      amount: null,
      status: "active",
      date: "2 days ago",
      icon: User,
    },
    {
      id: 4,
      type: "estimate",
      title: "Deck Construction - Brown House",
      customer: "Lisa Brown",
      amount: "$12,000",
      status: "accepted",
      date: "3 days ago",
      icon: FileText,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "accepted":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = (id: number, type: string) => {
    console.log(`Edit ${type} ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: number, type: string) => {
    console.log(`Delete ${type} ${id}`);
    // Implement delete functionality
  };

  const handleView = (id: number, type: string) => {
    console.log(`View ${type} ${id}`);
    // Implement view functionality
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <item.icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">{item.customer}</p>
                    {item.amount && (
                      <>
                        <span className="text-xs text-gray-400">•</span>
                        <p className="text-xs font-medium text-gray-900">
                          {item.amount}
                        </p>
                      </>
                    )}
                    <span className="text-xs text-gray-400">•</span>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleView(item.id, item.type)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleEdit(item.id, item.type)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(item.id, item.type)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
