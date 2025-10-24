import { Customer } from "../customers/customers";

export type EstimateStatus = "draft" | "pending" | "accepted" | "declined" | "completed" | "in_progress";
export type WorkType = "exterior" | "interior";


export type Estimate = {
    id: number;
    name: string;
    total: number;
    notes: string[];
    created_at: string;
    updated_at: string;
    customer_id: number;
    customer: Customer
    status: EstimateStatus;
    description: EstimateDescription;
}

export type EstimateDescription = {
    id: number;
    title: string;
    work_types: WorkType[];
    items: EstimateItem[];
}

export type EstimateItem = {
    id: number;
    area: string;
    work_details: string[];
    notes_extras: string[];
}