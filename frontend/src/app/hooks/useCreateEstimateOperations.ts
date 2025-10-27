import { EstimateFormData } from "@/lib/validations/estimate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Estimate } from "../types/estimates/estimates";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

export default function useCreateEstimateOperations() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: createEstimateMutation, isPending: isCreating, isSuccess: isCreateSuccess } = useMutation({
        mutationFn: (data: EstimateFormData) => createEstimateApiCall(data),
        onSuccess: (data) => {
            console.info("Estimate created successfully: ", data);
            queryClient.invalidateQueries({ queryKey: ["estimates"] });
            router.push(`/estimates/${data.id}`);
            toast.success('Estimate created successfully!');
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const createEstimate = (data: EstimateFormData) => {
        createEstimateMutation(data);
    };

    const cancelCreate = () => {
        router.back();
        toast.info('Cancelling estimate creation');
    };

    const generatePDF = () => {
        toast.info('PDF generation not implemented yet');
    };

    return {
        isCreating,
        isCreateSuccess,
        createEstimate,
        cancelCreate,
        generatePDF,
    };
}

async function createEstimateApiCall(data: EstimateFormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/estimates`, {
        method: "POST",
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.error("Error: ", res.status);
        console.error("Error: ", res.statusText);
        throw new Error(res.statusText);
    }
    const responseData = await res.json();
    return responseData.estimate as Estimate;
}
