import {
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    LucideIcon,
} from "lucide-react";

export interface StatusConfig {
    label: string;
    icon: LucideIcon;
    className: string;
    description: string;
}

// ! Force Tailwind CSS to include these classes in the compiled output
// ! These classes are used dynamically but need to be scanned statically
export const TAILWIND_SAFELIST_CLASSES = `
  bg-gray-100 bg-gray-400 text-gray-800
  bg-yellow-100 bg-yellow-400 text-yellow-800  
  bg-green-100 bg-green-400 bg-green-600 text-green-800
  bg-red-100 bg-red-400 text-red-800
  bg-blue-100 bg-blue-400 text-blue-800
  bg-purple-100 bg-purple-400 text-purple-800
`.trim();

export const getStatusConfig = (status: string): StatusConfig => {
    switch (status) {
        case "draft":
            return {
                label: "Draft",
                icon: FileText,
                className: "bg-gray-100 text-gray-800",
                description: "Not yet sent to customer",
            };
        case "pending":
            return {
                label: "Pending",
                icon: Clock,
                className: "bg-yellow-100 text-yellow-800",
                description: "Waiting for customer response",
            };
        case "accepted":
            return {
                label: "Accepted",
                icon: CheckCircle,
                className: "bg-green-100 text-green-800",
                description: "Customer has accepted",
            };
        case "declined":
            return {
                label: "Declined",
                icon: XCircle,
                className: "bg-red-100 text-red-800",
                description: "Customer has declined",
            };
        case "completed":
            return {
                label: "Completed",
                icon: CheckCircle,
                className: "bg-blue-100 text-blue-800",
                description: "Project completed",
            };
        case "in_progress":
            return {
                label: "In Progress",
                icon: Clock,
                className: "bg-purple-100 text-purple-800",
                description: "Work in progress",
            };
        default:
            return {
                label: "Unknown",
                icon: AlertCircle,
                className: "bg-gray-100 text-gray-800",
                description: "Status unknown",
            };
    }
};

export const ALL_STATUSES = [
    "draft",
    "pending",
    "accepted",
    "declined",
    "in_progress",
    "completed",
] as const;

