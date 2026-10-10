export interface Login {
    email: string,
    password: string
}

export interface Signup {
    fullName: string,
    email: string,
    password: string,
    phoneNumber: string
}

export interface UserSummary {
    id: string,
    name: string,
    email: string,
    username: string,
    profile?: string
}

export interface UserToken extends UserSummary {
    token: string,
}

export interface UserPayload extends UserSummary {
    phone: string,
    exp: number,
    iss: number,
    aud: number
}