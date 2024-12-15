import { TUser } from './user.type';

export type TNotification = {
    id: number,
    sender: TUser,
    isRead: boolean,
    isAccepted?: boolean,
    notificationType: 'COMMENT' | 'RELATIONSHIP_REQUEST' | 'GROUP_POST' | 'GROUP_INVITATION',
    referenceId: number,
    createdAt: string,
    updatedAt: string,
    postTitle?: string,
    message: string,
    commentContent?: string,
    groupAvatar?: string,
    groupName?: string,
    requestorName?: string,
    relationshipType?: string,
    requestRole?: string
}
