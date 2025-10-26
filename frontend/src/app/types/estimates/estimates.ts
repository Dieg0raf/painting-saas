
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
    customer_snapshot: CustomerSnapshot;
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

export type CustomerSnapshot = {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
}