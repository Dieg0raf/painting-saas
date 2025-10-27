import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useEstimateNavigation() {
    const router = useRouter();

    const viewEstimate = useCallback((estimateId: number) => {
        console.log(`Viewing estimate ${estimateId}`);
        router.push(`/estimates/${estimateId}`);
    }, [router]);

    const editEstimate = useCallback((estimateId: number) => {
        console.log(`Editing estimate ${estimateId}`);
        router.push(`/estimates/${estimateId}/edit`);
    }, [router]);

    const createEstimate = useCallback(() => {
        console.log(`Creating new estimate`);
        // router.push('/estimates/new');
    }, []);

    const duplicateEstimate = useCallback((estimateId: number) => {
        console.log(`Duplicating estimate ${estimateId}`);
        // router.push(`/estimates/new?duplicate=${estimateId}`);
    }, []);

    return {
        viewEstimate,
        editEstimate,
        createEstimate,
        duplicateEstimate,
    };
}
