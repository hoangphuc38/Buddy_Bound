import http from '../helpers/axiosConfig';
import { TAccount, TAuth, TLoginPost, TSignUp } from '../types/account.type';
import { TSuccessResponse } from '../types/response.type';

export class AuthApi {
    static async login(body: TLoginPost): Promise<TAuth> {
        const response = await http.post('auth/login', body);
        return response.data;
    }

    static async signup(body: TSignUp): Promise<TSuccessResponse<TAccount>> {
        const response = await http.post('auth/register', body);
        return response.data;
    }
}
