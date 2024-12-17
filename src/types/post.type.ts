import { TComment } from './comment.type';
import { TImage } from './image.type';
import { TLocationHistory } from './location-history.type';
import { TMember } from './member.type';

export type TPost = {
    id: number,
    note: string,
    image: TImage,
    isExpired: boolean,
    member: TMember,
    location: TLocationHistory,
    postVisibilities: TPostVisibility[],
    createdAt: string,
    updatedAt: string,
    firstComment: TComment,
    commentCount: number
}

export type TPostVisibility = {
    id: number,
    member: TMember
}
