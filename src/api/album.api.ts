import http from '../helpers/axiosConfig';
import { TAccount, TSignUp } from '../types/account.type';
import { TAlbum } from '../types/album.type';
import { TSuccessResponse } from '../types/response.type';

export class AlbumApi {
    static async getAlbums(): Promise<TSuccessResponse<TAlbum[]>> {
        return (await http.get('/albums')).data;
    }

    static async getAlbumById(id: number): Promise<TSuccessResponse<TAlbum>> {
        const response = await http.get(`/albums/${id}`);
        return response.data;
    }
}
