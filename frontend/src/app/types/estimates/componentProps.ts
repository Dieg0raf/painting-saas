import { Estimate } from "@/app/types/estimates/estimates";
import { LucideIcon } from "lucide-react";

export interface EstimatesStatsProps {
    estimates: Estimate[];
}

export interface EstimatesSearchFilterProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
}

export interface EstimateCardProps {
    estimate: Estimate;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    getStatusConfig: (status: string) => {
        label: string;
        icon: LucideIcon;
        className: string;
        description: string;
    };
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface EstimateRowProps {
    estimate: Estimate;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    getStatusConfig: (status: string) => {
        label: string;
        icon: LucideIcon;
        className: string;
        description: string;
    };
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface MobileEstimatesListProps {
    estimates: Estimate[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    getStatusConfig: (status: string) => {
        label: string;
        icon: LucideIcon;
        className: string;
        description: string;
    };
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface DesktopEstimatesTableProps {
    estimates: Estimate[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    getStatusConfig: (status: string) => {
        label: string;
        icon: LucideIcon;
        className: string;
        description: string;
    };
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}
