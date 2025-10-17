import { StatsCards } from "../../../components/Dashboard/StatsCards";
import { QuickActions } from "../../../components/Dashboard/QuickActions";
import { RecentActivity } from "../../../components/Dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here&apos;s what&apos;s happening with your business.
        </p>
      </div>

      <StatsCards />
      <QuickActions />
      <RecentActivity />
    </div>
  );
}
