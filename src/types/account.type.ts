import { TRole } from './role.type';
import { TUser } from './user.type';

export type TLoginPost = {
    email: string,
    password: string
}

export type TAuth = {
    account: TAccount,
    access_token: string,
    refresh_token: string
}

export type TSignUp = {
    email: string,
    password: string,
    fullName: string,
    gender: boolean,
    phoneNumber: string,
    birthday: string
}

export type TAccount = {
    id: number,
    email: string,
    user: TUser,
    role: TRole
}
