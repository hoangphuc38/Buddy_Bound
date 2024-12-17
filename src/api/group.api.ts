import http from '../helpers/axiosConfig';
import { TGroup } from '../types/group.type';
import { TSuccessResponse } from '../types/response.type';

export class GroupApi {
    static async getBuddies(): Promise<TSuccessResponse<TGroup>> {
        const response = await http.get('/group');
        console.log('hehe: ', response);
        return response.data;
    }
}
