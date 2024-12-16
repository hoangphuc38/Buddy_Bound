import { TUser } from './user.type';

export type TLocationHistory = {
    id: number,
    user: TUser,
    latitude: number,
    longitude: number,
    createdAt: string
}
