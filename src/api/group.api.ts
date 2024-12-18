import http from '../helpers/axiosConfig';
import { TGroup } from '../types/group.type';
import { TMember } from '../types/member.type';
import { TSuccessResponse } from '../types/response.type';

export class GroupApi {
    static async getBuddies(): Promise<TSuccessResponse<TGroup>> {
        const response = await http.get('/group');
        return response.data;
    }

    static async getMembers(groupId: number): Promise<TSuccessResponse<TMember[]>> {
        const response = await http.get(`/group/getMembers?groupId=${groupId}&isApproved=true`);
        return response.data;
    }

    static async getWaitingApproval(groupId: number): Promise<TSuccessResponse<TMember[]>> {
        const response = await http.get(`/group/getMembers?groupId=${groupId}&isApproved=false`);
        return response.data;
    }
}
