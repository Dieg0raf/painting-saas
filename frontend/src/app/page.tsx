import CompanyList from "./components/Dashboard/ComanyList";
import { DashboardLayout } from "./components/DashboardLayout/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Your dashboard content */}
          <CompanyList />
        </div>
      </div>
    </DashboardLayout>
  );
}
