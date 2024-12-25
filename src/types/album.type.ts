import { TPost } from './post.type';
import { TUser } from './user.type';

export type TAlbum = {
    id: number,
    title: string,
    user: TUser,
    posts: TPost[],
    createdAt: string
}

export type TCreateAlbum = {
    id?: number,
    postIdList: number[],
    title: string
}
