import http from '../helpers/axiosConfig';
import { TMemorablePlace } from '../types/location-history.type';
import { TSuccessResponse } from '../types/response.type';

export class MemorablePlaceApi {
    static async getAll(): Promise<TSuccessResponse<TMemorablePlace[]>> {
        const response = await http.get('/memorable-destination');
        return response.data;
    }

    static async create(data: TMemorablePlace): Promise<TSuccessResponse<void>> {
        const response = await http.post('/memorable-destination', data);
        return response.data;
    }
}
