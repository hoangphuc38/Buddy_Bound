import { Asset } from 'react-native-image-picker';
import http, { httpClient } from '../helpers/axiosConfig';
import { TCreatePost, TPost } from '../types/post.type';
import { TSuccessResponse } from '../types/response.type';
import { TCreateImage } from '../types/image.type';
import axios from 'axios';

export class PostApi {
    static async getAll(groupId: number): Promise<TSuccessResponse<TPost[]>> {
        const response = await http.get(`/posts/get-all?groupId=${groupId}&isExpired=false`);
        return response.data;
    }

    static async getDetail(postId: number): Promise<TSuccessResponse<TPost>> {
        const response = await http.get(`/posts/get-detail?postId=${postId}`);
        return response.data;
    }

    static async createPost(postData: TCreatePost, image?: TCreateImage): Promise<TSuccessResponse<TPost>> {
        const formData = new FormData();

        if (image) {
            formData.append('image', image);
        }

        formData.append('postData', JSON.stringify(postData));

        const response = await http.post('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        return response.data;
    }

    static async getUserPosts(): Promise<TSuccessResponse<TPost[]>> {
        return (await http.get('/posts/get-user-posts')).data;
    }
}
