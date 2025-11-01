import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useExportPDF() {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/estimates/${id}/pdf`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/pdf",
                },
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({ error: "Failed to generate PDF" }));
                throw new Error(error.error || "Failed to generate PDF");
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `estimate-${id}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        },
        onSuccess: () => {
            toast.success("PDF generated successfully");
        },
        onError: (error) => {
            toast.error(error instanceof Error ? error.message : "Failed to generate PDF. Please try again.");
        },
    });
}
