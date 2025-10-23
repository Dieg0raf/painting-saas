import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Calendar,
} from "lucide-react";
import { EstimateRowProps } from "@/app/types/estimates/componentProps";

export function EstimateRow({
  estimate,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  getStatusConfig,
  formatDate,
  formatCurrency,
}: EstimateRowProps) {
  const statusConfig = getStatusConfig(estimate.status);

  return (
    <TableRow
      className="hover:bg-gray-50 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      onClick={() => onView(estimate.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(estimate.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View estimate ${estimate.id} for ${estimate.customer.name}`}
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />#{estimate.id}
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium text-gray-900">
            {estimate.customer.name}
          </div>
          <div className="text-sm text-gray-500">{estimate.customer.email}</div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium text-gray-900">{estimate.name}</div>
          <div className="text-sm text-gray-500 max-w-xs truncate">
            {estimate.description?.title || "No description"}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-semibold text-gray-900">
        {formatCurrency(estimate.total)}
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
          {formatDate(estimate.created_at)}
        </div>
      </TableCell>
      <TableCell className="text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(estimate.updated_at)}
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Actions for estimate ${estimate.id}`}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onView(estimate.id);
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit(estimate.id);
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(estimate.id);
              }}
            >
              <FileText className="mr-2 h-4 w-4" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(estimate.id);
              }}
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
}
