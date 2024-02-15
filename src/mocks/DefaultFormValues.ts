import { TLogInUser, TUserData } from "@src/@types/requestTypes"

export const defaultlogInValues: TLogInUser = {
    email: "",
    password: "",
}


export const defaultRegisterValues: TUserData = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    "repeat-password": "",
}