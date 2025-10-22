import { EstimateCard } from "./EstimateCard";
import { MobileEstimatesListProps } from "@/app/types/estimates/componentProps";
import { Estimate } from "@/app/types/estimates/estimates";

export function MobileEstimatesList({
  estimates,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
  getStatusConfig,
  formatDate,
  formatCurrency,
}: MobileEstimatesListProps) {
  return (
    <div className="block sm:hidden space-y-3">
      {estimates.map((estimate: Estimate) => (
        <EstimateCard
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
    </div>
  );
}
