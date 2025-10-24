import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { EstimateRow } from "./EstimateRow";
import { DesktopEstimatesTableProps } from "@/app/types/estimates/componentProps";
import { Estimate } from "@/app/types/estimates/estimates";

export function DesktopEstimatesTable({
  estimates,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  getStatusConfig,
  formatDate,
  formatCurrency,
}: DesktopEstimatesTableProps) {
  return (
    <div className="hidden sm:block overflow-x-auto" id="estimates-table">
      <Table role="table" aria-label="Estimates list">
        <TableHeader>
          <tr>
            <TableHead scope="col">Estimate ID</TableHead>
            <TableHead scope="col">Customer</TableHead>
            <TableHead scope="col">Project</TableHead>
            <TableHead scope="col">Amount</TableHead>
            <TableHead scope="col">Status</TableHead>
            <TableHead scope="col">Created</TableHead>
            <TableHead scope="col">Updated</TableHead>
            <TableHead scope="col" className="w-12">
              Actions
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {estimates.map((estimate: Estimate) => (
            <EstimateRow
              key={estimate.id}
              estimate={estimate}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              getStatusConfig={getStatusConfig}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
