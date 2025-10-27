import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function useDeleteEstimateOperations() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: deleteEstimateMutation, isPending: isDeleting } = useMutation({
        mutationFn: (estimateId: number) => deleteEstimateApiCall(estimateId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["estimates"] });
            router.refresh();
            toast.success('Estimate deleted successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const deleteEstimate = (estimateId: number) => {
        if (confirm("Are you sure you want to delete this estimate?")) {
            deleteEstimateMutation(estimateId);
        } else {
            toast.info("Estimate deletion cancelled");
        }
    };

    return {
        isDeleting,
        deleteEstimate,
    };
}

async function deleteEstimateApiCall(estimateId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimates/${estimateId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        console.error("Error: ", res.status);
        console.error("Error: ", res.statusText);
        throw new Error(res.statusText);
    }
    const responseData = await res.json();
    return responseData;
}

