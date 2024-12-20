import { Asset } from 'react-native-image-picker';
import http, { httpClient } from '../helpers/axiosConfig';
import { TCreatePost, TPost } from "../types/post.type";
import { TSuccessResponse } from "../types/response.type";
import { TCreateImage } from '../types/image.type';

export class PostApi {
    static async getAll(groupId: number): Promise<TSuccessResponse<TPost[]>> {
        const response = await http.get(`/posts/get-all?groupId=${groupId}`);
        return response.data;
    }

    static async getDetail(postId: number): Promise<TSuccessResponse<TPost>> {
        const response = await http.get(`/posts/get-detail?postId=${postId}`);
        return response.data;
    }

    static async createPost(image: TCreateImage, postData: TCreatePost): Promise<TSuccessResponse<TPost>> {
        let formData = new FormData();

        formData.append("image", image);

        // const postDataBlob = new Blob([JSON.stringify(postData)], {
        //     type: 'application/json'
        // });

        console.log("check: ", JSON.stringify(postData));

        formData.append("postData", JSON.stringify(postData));

        const response = await http.post(`/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            },
        });

        return response.data;
    }
}