import { TUser } from './user.type';

export type TLocationHistory = {
    id: number,
    user: TUser,
    latitude: number,
    longitude: number,
    createdAt: string
}

export type TMemorablePlace = {
    id: number;
    note: string;
    locationType: string;
    latitude: number,
    longitude: number,
    createdAt: string
}