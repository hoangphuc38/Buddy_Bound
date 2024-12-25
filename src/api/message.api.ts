import http from '../helpers/axiosConfig';
import { TCreateImage } from '../types/image.type';
import { TMessage, TRequestMessage, TSendMessage } from '../types/message.type';
import { TSuccessResponse } from '../types/response.type';

export class MessageApi {
    static async getAll(page: number, size: number, groupId: number): Promise<TSuccessResponse<TMessage[]>> {
        const response = await http.get(`/messages/get-group-messages/${groupId}?page=${page}&size=${size}`);
        return response.data;
    }

    static async send(stringDto: TSendMessage, images: TCreateImage[]): Promise<TSuccessResponse<TMessage>> {
        const formData = new FormData();

        formData.append('images', images);

        formData.append('stringDto', JSON.stringify(stringDto));

        const response = await http.post('/messages/sendMessage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });

        return response.data;
    }
}