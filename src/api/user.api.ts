import http from '../helpers/axiosConfig';
import { TSuccessResponse } from '../types/response.type';
import { TSetting } from '../types/setting.type';
import { TUser } from '../types/user.type';

export class UserApi {
    static async updateSettings(body: TSetting): Promise<TSuccessResponse<TSetting[]>> {
        return (await http.put('/users/update-settings', body)).data;
    }

    static async getSettings(): Promise<TSuccessResponse<TSetting>> {
        return (await http.get('/users/settings')).data;
    }

    static async getUsers(searchText: string): Promise<TSuccessResponse<TUser[]>> {
        let url = `/users/search`;

        const isNumber = /^\d+$/.test(searchText);

        if (isNumber) {
            url = `${url}?phoneNumber=${searchText}&hasRelationship=true`;
        } else {
            url = `${url}?fullName=${searchText}&hasRelationship=true`;
        }

        return (await http.get(url)).data;
    }
}

