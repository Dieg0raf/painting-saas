import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle, DollarSign } from "lucide-react";
import { EstimatesStatsProps } from "@/app/types/estimates/componentProps";

export function EstimatesStats({ estimates }: EstimatesStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Estimates
              </p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {estimates.length}
              </p>
            </div>
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Pending
              </p>
              <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                {estimates.filter((e) => e.status === "pending").length}
              </p>
            </div>
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Accepted
              </p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {estimates.filter((e) => e.status === "accepted").length}
              </p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Total Value
              </p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(estimates.reduce((sum, e) => sum + e.total, 0))}
              </p>
            </div>
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
