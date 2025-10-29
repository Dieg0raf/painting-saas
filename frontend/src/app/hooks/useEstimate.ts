import { useQuery } from "@tanstack/react-query";
import { Estimate } from "../types/estimates/estimates";

export function useEstimate(id: string) {
    const { data: estimate, isLoading, error } = useQuery<Estimate>({
        queryKey: ["estimate", id],
        queryFn: () => fetchEstimate(id),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return { estimate: estimate as Estimate, isLoading, error };
}

async function fetchEstimate(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimates/${id}`);
    const data = await res.json();
    if (!res.ok) {
        console.error("Error: ", res.status);
        console.error("Error: ", res.statusText);
        throw new Error(res.statusText);
    }
    return data.estimate as Estimate;
}