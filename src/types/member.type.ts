import { TUser } from './user.type';

export type TMember = {
    id: number,
    user: TUser,
    role: string,
    isAdmin: boolean,
}
