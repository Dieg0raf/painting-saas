import { Estimate } from "@/app/types/estimates/estimates";

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
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface EstimateRowProps {
    estimate: Estimate;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface MobileEstimatesListProps {
    estimates: Estimate[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}

export interface DesktopEstimatesTableProps {
    estimates: Estimate[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
    formatDate: (date: string) => string;
    formatCurrency: (amount: number) => string;
}
