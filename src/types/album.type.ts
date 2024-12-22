import { TPost } from './post.type';
import { TUser } from './user.type';

export type TAlbum = {
    id: number,
    title: string,
    user: TUser,
    posts: TPost[],
}
