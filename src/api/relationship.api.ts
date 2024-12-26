import http from '../helpers/axiosConfig';
import { TNewRelationship, TRelationship, TUserRelationship } from '../types/relationship.type';
import { TSuccessResponse } from '../types/response.type';
import { TBlockedUser } from '../types/user.type';

export class RelationshipApi {
    static async getRelationshipsByType(params: TUserRelationship): Promise<TSuccessResponse<TRelationship[]>> {
        return (await http.get('/relationship/get-user-relationship', {
            params: {
                type: params.type,
                searchText: params.searchText ? params.searchText : undefined,
                isPending: params.isPending ? params.isPending : undefined,
            },
        })).data;
    }

    static async limitRelationship(blockedUserId?: number, id?: number): Promise<TSuccessResponse<void>> {
        if (id) {
            return (await http.post('/relationship/update-restriction', {
                id,
            })).data;
        }
        return (await http.post('/relationship/update-restriction', {
            blockedUserId,
        })).data;
    }

    static async newRelationship(body: TNewRelationship): Promise<TSuccessResponse<null>> {
        const response = await http.post('/relationship/add', body);
        return response.data;
    }

    static async getLimitedPeople(): Promise<TSuccessResponse<TBlockedUser[]>> {
        const response = await http.get('/relationship/get-all-restricted-user');
        return response.data;
    }

    static async getPendingRelationship(): Promise<TSuccessResponse<TRelationship[]>> {
        const response = await http.get('/relationship/get-pending-relationship');
        return response.data;
    }

    static async acceptRequest(relationshipId: number): Promise<TSuccessResponse<null>> {
        const response = await http.put(`/relationship/accept-invitation/${relationshipId}`);
        return response.data;
    }
}
