import { EstimateFormData } from "@/lib/validations/estimate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Estimate } from "../types/estimates/estimates";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function useEditEstimateOperations(estimateId: string) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: saveEstimateMutation, isPending: isSaving } = useMutation({
        mutationFn: (data: EstimateFormData) => saveEstimateApiCall(estimateId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["estimate", estimateId] });
            queryClient.invalidateQueries({ queryKey: ["estimates"] });
            // TODO: Figure out if there is a need to redirect to the estimate page (or just let the user navigate to the estimate page themselves)
            router.push(`/estimates/${estimateId}`);
            toast.success('Estimate saved');
        },
        onError: (error) => {
            toast.error(`Failed to save estimate: ${error.message}`);
        },
    });


    const saveEstimate = (data: EstimateFormData) => {
        saveEstimateMutation(data);
    };

    const cancelEdit = () => {
        router.back();
    };

    return {
        isSaving,
        saveEstimate,
        cancelEdit,
    };
}

async function saveEstimateApiCall(estimateId: string, data: EstimateFormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimates/${estimateId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.error("Error: ", res.status);
        console.error("Error: ", res.statusText);
        throw new Error("Failed to save estimate");
    }
    // TODO: Figure out if there is a need to return the estimate (caught inside of onSuccess)
    const responseData = await res.json();
    return responseData as Estimate;
}