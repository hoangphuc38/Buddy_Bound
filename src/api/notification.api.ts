import http from '../helpers/axiosConfig';
import { TNotification } from '../types/notification.type';
import { TSuccessResponse } from '../types/response.type';

export class NotificationApi {
    static async getAll(): Promise<TSuccessResponse<TNotification[]>> {
        const response = await http.get(`/notifications`);
        return response.data;
    }

    static async markAsRead(notificationId: number): Promise<TSuccessResponse<TNotification>> {
        const response = await http.put(`/notifications/${notificationId}`);
        return response.data;
    }
}