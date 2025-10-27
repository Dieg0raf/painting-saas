import { z } from "zod";

// Enums matching backend models
export const EstimateStatus = z.enum([
    "draft",
    "pending",
    "accepted",
    "declined",
    "completed",
    "in_progress"
]);

export const WorkType = z.enum(["exterior", "interior"]);

export const CustomerSnapshotSchema = z.object({
    name: z.string().min(1, "Customer name is required").max(80, "Name must be less than 80 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(1, "Phone number is required").max(15, "Phone number must be less than 15 characters"),
    address: z.string().min(1, "Address is required").max(120, "Address must be less than 120 characters"),
    city: z.string().min(1, "City is required").max(120, "City must be less than 120 characters"),
    state: z.string().min(1, "State is required").max(120, "State must be less than 120 characters"),
    zip_code: z.string().min(1, "Zip code is required").max(120, "Zip code must be less than 120 characters"),
    country: z.string().min(1, "Country is required").max(120, "Country must be less than 120 characters"),
});

// Estimate Item Schema
export const EstimateItemSchema = z.object({
    id: z.number().optional(),
    area: z.string().min(1, "Area is required").max(100, "Area must be less than 100 characters"),
    work_details: z.array(z.string()),
    notes_extras: z.array(z.string())
});

// Estimate Description Schema
export const EstimateDescriptionSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Project title is required").max(120, "Title must be less than 120 characters"),
    work_types: z.array(WorkType).min(1, "At least one work type is required"),
    items: z.array(EstimateItemSchema)
});

// Main Estimate Schema
export const EstimateSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Estimate name is required").max(80, "Name must be less than 80 characters"),
    total: z.number().min(0, "Total must be positive"),
    status: EstimateStatus,
    notes: z.array(z.string()).default([]),
    customer_snapshot: CustomerSnapshotSchema,
    description: EstimateDescriptionSchema,
    customer_id: z.number(),
    company_id: z.number(),
    created_by_id: z.number(),
    created_at: z.string().optional(),
    updated_at: z.string().optional()
});

// Form-specific schemas (for editing)
export const EditEstimateFormSchema = z.object({
    name: z.string().min(1, "Estimate name is required").max(80, "Name must be less than 80 characters"),
    total: z.number().min(0, "Total must be positive"),
    status: EstimateStatus,
    notes: z.array(z.string()),
    customer_snapshot: CustomerSnapshotSchema,
    description: EstimateDescriptionSchema
});

export type EstimateFormData = z.infer<typeof EditEstimateFormSchema>;