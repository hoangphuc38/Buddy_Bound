import http from '../helpers/axiosConfig';
import { TSuccessResponse } from '../types/response.type';
import { TUser } from '../types/user.type';

export class UserApi {
    static async getUsers(searchText: string): Promise<TSuccessResponse<TUser[]>> {
        let url = `/users/search`;

        const isNumber = /^\d+$/.test(searchText);

        if (isNumber) {
            url = `${url}?phoneNumber=${searchText}`;
        } else {
            url = `${url}?fullName=${searchText}`;
        }

        return (await http.get(url)).data;
    }
}