import CompanyList from "./ComanyList";
export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      Signed In Dashboard
      <CompanyList />
    </div>
  );
}
