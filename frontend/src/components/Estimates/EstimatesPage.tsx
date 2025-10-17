"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export function EstimatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - replace with real API data
  const estimates = [
    {
      id: "EST-001",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      projectName: "Kitchen Renovation",
      amount: 15500,
      status: "pending",
      createdDate: "2024-01-15",
      dueDate: "2024-01-30",
      description: "Complete kitchen remodel with new cabinets and countertops",
    },
    {
      id: "EST-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      projectName: "Bathroom Remodel",
      amount: 8200,
      status: "accepted",
      createdDate: "2024-01-10",
      dueDate: "2024-01-25",
      description: "Master bathroom renovation with walk-in shower",
    },
    {
      id: "EST-003",
      customerName: "Mike Wilson",
      customerEmail: "mike.wilson@email.com",
      projectName: "Deck Construction",
      amount: 12000,
      status: "declined",
      createdDate: "2024-01-08",
      dueDate: "2024-01-23",
      description: "New composite deck with railing and stairs",
    },
    {
      id: "EST-004",
      customerName: "Lisa Brown",
      customerEmail: "lisa.brown@email.com",
      projectName: "Roof Replacement",
      amount: 18500,
      status: "draft",
      createdDate: "2024-01-20",
      dueDate: "2024-02-05",
      description: "Complete roof replacement with new shingles",
    },
    {
      id: "EST-005",
      customerName: "David Lee",
      customerEmail: "david.lee@email.com",
      projectName: "Pool Installation",
      amount: 25000,
      status: "draft",
      createdDate: "2024-01-25",
      dueDate: "2024-02-10",
      description: "New in-ground pool with waterfall and spa",
    },
  ];

  // Filter estimates based on search and status
  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || estimate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Status configuration for consistent styling
  const getStatusConfig = (status: string) => {
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
      default:
        return {
          label: "Unknown",
          icon: AlertCircle,
          className: "bg-gray-100 text-gray-800",
          description: "Status unknown",
        };
    }
  };

  // Use string formatting to avoid SSR/CSR date mismatch issues

  const formatCurrency = (amount: number) => {
    // Intl.NumberFormat is generally safe as it does not contain local timezone issues
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString: string) => {
    // Avoid using toLocaleDateString and time zone gotchas on server/client mismatch
    // Instead, do a simple UTC-based template (YYYY-MM-DD) or a custom readable string

    // Example: 2024-04-12 or Apr 12, 2024
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // fallback for invalid dates

    // Always output in UTC -- prevents hydration issues
    const year = date.getUTCFullYear();
    const monthIndex = date.getUTCMonth(); // Jan is 0
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

  const handleView = (estimateId: string) => {
    console.log(`View estimate ${estimateId}`);
    // Implement view functionality
  };

  const handleEdit = (estimateId: string) => {
    console.log(`Edit estimate ${estimateId}`);
    // Implement edit functionality
  };

  const handleDelete = (estimateId: string) => {
    console.log(`Delete estimate ${estimateId}`);
    // Implement delete functionality
  };

  const handleDuplicate = (estimateId: string) => {
    console.log(`Duplicate estimate ${estimateId}`);
    // Implement duplicate functionality
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Estimates</h1>
          <p className="text-gray-600 mt-1">
            Manage your project estimates and track customer responses
          </p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Estimate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Estimates
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {estimates.length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {estimates.filter((e) => e.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accepted</p>
                <p className="text-2xl font-bold text-green-600">
                  {estimates.filter((e) => e.status === "accepted").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    estimates.reduce((sum, e) => sum + e.amount, 0)
                  )}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name, project, or estimate ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search estimates"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Estimates ({filteredEstimates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEstimates.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No estimates found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first estimate"}
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Estimate
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estimate ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEstimates.map((estimate) => {
                    const statusConfig = getStatusConfig(estimate.status);
                    return (
                      <TableRow
                        key={estimate.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleView(estimate.id)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            {estimate.id}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {estimate.customerName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {estimate.customerEmail}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {estimate.projectName}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {estimate.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                          {formatCurrency(estimate.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig.className}>
                            <statusConfig.icon className="h-3 w-3 mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(estimate.createdDate)}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(estimate.dueDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Actions for ${estimate.id}`}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(estimate.id)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEdit(estimate.id)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDuplicate(estimate.id)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(estimate.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
