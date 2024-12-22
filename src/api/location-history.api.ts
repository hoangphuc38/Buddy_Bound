import http from '../helpers/axiosConfig';
import { TLocationHistory } from '../types/location-history.type';
import { TLocation } from '../types/location.type';
import { TSuccessResponse } from '../types/response.type';

export class LocationHistoryApi {
    static async get(startDate?: string, endDate?: string): Promise<TSuccessResponse<TLocationHistory[]>> {
        const response = await http.get('/location-history/get-location');
        return response.data;
    }

    static async getUserLocations(groupId: number): Promise<TSuccessResponse<TLocation[]>> {
        return (await http.get(`/location/loadMap/${groupId}`)).data;
    }

    static async updateLocation(latitude: number, longitude: number): Promise<void> {
        return (await http.post('/location/update', {
            latitude: latitude,
            longitude: longitude,
        }));
    }
}
