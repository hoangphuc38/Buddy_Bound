import { TImage } from './image.type';
import { TMember } from './member.type';

export type TMessage = {
    id: number,
    groupId: number,
    member: TMember,
    content: string,
    images: TImage[],
    createdAt: string,
    updatedAt: string
}
