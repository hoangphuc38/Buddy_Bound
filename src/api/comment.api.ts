import http from '../helpers/axiosConfig';
import { TAddComment, TComment } from '../types/comment.type';
import { TSuccessResponse } from '../types/response.type';

export class CommentApi {
    static async getAllComment(postId: number): Promise<TSuccessResponse<TComment[]>> {
        const response = await http.get(`/comments?postId=${postId}`);
        return response.data;
    }

    static async commentPost(body: TAddComment): Promise<TSuccessResponse<TComment>> {
        const response = await http.post('/comments/add', body);
        return response.data;
    }
}