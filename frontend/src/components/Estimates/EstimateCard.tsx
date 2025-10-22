import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { EstimateCardProps } from "@/app/types/estimates/componentProps";

export function EstimateCard({
  estimate,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  getStatusConfig,
  formatDate,
  formatCurrency,
}: EstimateCardProps) {
  const statusConfig = getStatusConfig(estimate.status);

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
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
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="font-medium text-gray-900">#{estimate.id}</span>
          </div>
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
              <DropdownMenuItem onClick={() => onView(estimate.id)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(estimate.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(estimate.id)}>
                <FileText className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(estimate.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2">
          <div>
            <h3 className="font-medium text-gray-900">{estimate.name}</h3>
            <p className="text-sm text-gray-500">{estimate.customer.name}</p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(estimate.total)}
            </span>
            <Badge className={statusConfig.className}>
              <statusConfig.icon className="h-3 w-3 mr-1" />
              {statusConfig.label}
            </Badge>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>Created: {formatDate(estimate.created_at)}</span>
            <span>Updated: {formatDate(estimate.updated_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
