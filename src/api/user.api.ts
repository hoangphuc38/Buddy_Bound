import http from '../helpers/axiosConfig';
import { TSuccessResponse } from '../types/response.type';
import { TSetting } from '../types/setting.type';

export class UserApi {
    static async updateSettings(body: TSetting): Promise<TSuccessResponse<TSetting[]>> {
        return (await http.put('/users/update-settings', body)).data;
    }

    static async getSettings(): Promise<TSuccessResponse<TSetting>> {
        return (await http.get('/users/settings')).data;
    }
}
