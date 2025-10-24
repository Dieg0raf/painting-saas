import { EstimateFormData } from "@/lib/validations/estimate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Estimate } from "../types/estimates/estimates";
import { useRouter } from "next/navigation";

export default function useEditEstimateOperations(estimateId: string) {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutate: saveEstimateMutation, isPending: isSaving, isError: isSaveError, error: saveError, isSuccess: isSaveSuccess } = useMutation({
        mutationFn: (data: EstimateFormData) => saveEstimateApiCall(estimateId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["estimate", estimateId] });
            queryClient.invalidateQueries({ queryKey: ["estimates"] });
            router.push(`/estimates/${estimateId}`);
        },
        onError: (error) => {
            console.error("Error: ", error.message);
        },
    });


    const saveEstimate = (data: EstimateFormData) => {
        saveEstimateMutation(data);
    };

    const cancelEdit = () => {
        console.log(`Cancelling edit for estimate ${estimateId}`);
        router.back();
    };

    return {
        isSaving,
        isSaveError,
        saveError,
        isSaveSuccess,
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