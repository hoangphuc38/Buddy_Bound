import { TMember } from './member.type';

export type TComment = {
    id: number,
    postId: number,
    member: TMember,
    content:string,
    createdAt: string
}
