import http from '../helpers/axiosConfig';
import { TLocationHistory } from '../types/location-history.type';
import { TLocation } from '../types/location.type';
import { TSuccessResponse } from '../types/response.type';

export class LocationHistoryApi {
    static async get(startDate?: string, endDate?: string): Promise<TSuccessResponse<TLocationHistory[]>> {
        let url = '/location-history/get-location';
        const params: string[] = [];

        if (startDate) {
            params.push(`startDate=${startDate}`);
        }
        if (endDate) {
            params.push(`endDate=${endDate}`);
        }

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        const response = await http.get(url);
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

    static async getMemberLocation(userId: number | null): Promise<TSuccessResponse<TLocation>> {
        return (await http.get(`/location/getUserLocation/${userId}`)).data;
    }
}
