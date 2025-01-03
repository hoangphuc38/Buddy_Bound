import { TUser } from './user.type';

export type TUserRelationship = {
    searchText?: string,
    isPending?: boolean,
    type: string
}

export type TRelationship = {
    id: number,
    receiver: TUser,
    familyType: string,
    friendType: string,
    senderRole: string,
    receiverRole: string,
    createdAt: string,
    updatedAt: string
}

export type TNewRelationship = {
    receiverId: number,
    relationshipType: string,
    familyType?: string,
    friendType?: string,
    senderRole?: string,
    receiverRole?: string
}
