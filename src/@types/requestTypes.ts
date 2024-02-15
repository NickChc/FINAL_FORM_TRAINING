

export interface TUserData {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    "repeat-password": string;
}


export interface TUserTokens {
    access_token: string;
    refresh_token: string;
}