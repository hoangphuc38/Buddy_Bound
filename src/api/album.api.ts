import http from '../helpers/axiosConfig';
import { TAlbum, TCreateAlbum } from '../types/album.type';
import { TSuccessResponse } from '../types/response.type';

export class AlbumApi {
    static async getAlbums(): Promise<TSuccessResponse<TAlbum[]>> {
        return (await http.get('/albums')).data;
    }

    static async getAlbumById(id: number): Promise<TSuccessResponse<TAlbum>> {
        const response = await http.get(`/albums/${id}`);
        return response.data;
    }

    static async createAlbum(body: TCreateAlbum): Promise<TSuccessResponse<TAlbum>> {
        const response = await http.post('/albums', body);
        return response.data;
    }

    static async deleteAlbum(id: number) {
        await http.delete(`/albums/${id}`);
    }
}
