import http from '../helpers/axiosConfig';
import { TPost } from "../types/post.type";
import { TSuccessResponse } from "../types/response.type";

export class PostApi {
    static async getAll(groupId: number): Promise<TSuccessResponse<TPost[]>> {
        const response = await http.get(`/posts/get-all?groupId=${groupId}`);
        return response.data;
    }

    static async getDetail(postId: number): Promise<TSuccessResponse<TPost>> {
        const response = await http.get(`/posts/get-detail?postId=${postId}`);
        return response.data;
    }
}