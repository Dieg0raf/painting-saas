export type UserProfile = {
    id: string
    username: string
    role: string
}

export type LoginCredentials = {
    email: string
    password: string
}

export type AuthResponse = {
    access_token: string
    refresh_token: string
    user_id: string
    username: string
    role: string
}