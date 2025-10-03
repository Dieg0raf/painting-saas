'use client';
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
    const { data: authData, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            console.log("fetching user");
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            console.log("fetched user: ", data);
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes: data is considered fresh for 5 minutes
        refetchOnWindowFocus: false, // do not refetch on window focus
        refetchOnReconnect: false,   // do not refetch on reconnect
        refetchOnMount: false,       // do not refetch on remount if data is fresh
        retry: false,
    });

    console.log("📊 Auth state:", {
        user: authData?.user,
        isLoading,
        fullData: authData // Add this to see the full response
    });

    return {
        user: authData?.user,
        isLoggedIn: !!authData?.user,
        isLoading,
        error
    };
}