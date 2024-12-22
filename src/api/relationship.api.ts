import http from '../helpers/axiosConfig';
import { TRelationship, TUserRelationship } from '../types/relationship.type';
import { TSuccessResponse } from '../types/response.type';
import { TUser } from '../types/user.type';

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
}
