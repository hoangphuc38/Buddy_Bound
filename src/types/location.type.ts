import { TUser } from './user.type';

export type TLocation = {
    id?: number;
    userId?: number;
    user?: TUser,
    longitude: number;
    latitude: number;
    timestamp: string
}
