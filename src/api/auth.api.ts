import http from '../helpers/axiosConfig';
import {
  TAccount,
  TAuth,
  TLoginPost,
  TSignUp,
  TEmail,
  TVerify,
} from '../types/account.type';
import {TSuccessResponse} from '../types/response.type';

export class AuthApi {
  static async login(body: TLoginPost): Promise<TAuth> {
    const response = await http.post('auth/login', body);
    return response.data;
  }

  static async signup(body: TSignUp): Promise<TSuccessResponse<TAccount>> {
    const response = await http.post('auth/register', body);
    return response.data;
  }

  static async forgetPass(body: TEmail) {
    const response = await http.post('auth/forgot-password', body);
    return response.data;
  }

  static async verifyCode(body: TVerify) {
    const response = await http.post('auth/verify-code', body);
    return response.data;
  }

  static async changePass (body: TLoginPost) {
    const response = await http.put('auth/change-password', body);
    return response.data;
  }
}
