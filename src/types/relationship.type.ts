import { TUser } from './user.type';

export type TUserRelationship = {
    searchText?: string,
    isPending?: string,
    type: string
}

export type TRelationship = {
    id: number,
    receiver: TUser,
    familyType: string,
    senderRole: string,
    receiverRole: string,
    createdAt: string,
    updatedAt: string
}
