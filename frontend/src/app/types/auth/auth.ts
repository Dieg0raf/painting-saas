
export type Company = {
    id: string;
    name: string;
    phone_number: string;
    email: string;
    logo: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    work_types: WorkType[];
};

export type WorkType = "exterior" | "interior";


export type UserProfile = {
    id: string
    username: string
    email: string
    roles: string[]
    company: Company;
}

export type LoginCredentials = {
    email: string
    password: string
}

export type AuthResponse = {
    access_token: string
    refresh_token: string
    user: UserProfile
}