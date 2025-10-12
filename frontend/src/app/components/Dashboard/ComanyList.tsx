"use client";
import { useQuery } from "@tanstack/react-query";

type Company = {
  name: string;
  id: string;
};

export default function CompanyList() {
  const {
    data: companies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      // TODO: Figure out why it's useQuery isn't caching
      // TODO: Remove this component and create the actual one that will be used in the app (this one was just used for testing)
      // and keeping re-fetching the data
      const res = await fetch("/api/auth/companies");
      const data = await res.json();
      // console.log("data", data);
      return data.companies as Company[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false, // do not refetch on window focus
    refetchOnReconnect: false, // do not refetch on reconnect
    refetchOnMount: false, // do not refetch on remount if data is fresh
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // console.log("companies", companies);

  return (
    <div>
      <h1>Company List</h1>
      {companies?.map((company) => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
}
