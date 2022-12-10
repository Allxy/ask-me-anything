import axios, { AxiosInstance, AxiosResponse } from 'axios';
import User from './models/User';

export class AMAApi {
  private readonly axios: AxiosInstance;
  private readonly tokenKey: string;

  constructor (baseURL: string, tokenKey: string) {
    this.axios = axios.create({
      baseURL
    });
    this.tokenKey = tokenKey;

    const token = localStorage.getItem(tokenKey);
    if (token !== null) this.axios.defaults.headers.authorization = 'Bearer ' + token;
  }

  public setToken (token: string): void {
    this.axios.defaults.headers.authorization = 'Bearer ' + token;
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken (): void {
    delete this.axios.defaults.headers.authorization;
    localStorage.removeItem(this.tokenKey);
  }

  public getDataFromForm (formData: FormData): object {
    const data: any = {};
    formData.forEach((element, key) => {
      data[key] = element;
    });
    return data;
  }

  public async signIn (data: any): Promise<AxiosResponse<{ token: string }>> {
    return await this.axios.post('/signin', data);
  }

  public async signUp (data: any): Promise<AxiosResponse<User>> {
    return await this.axios.post('/signup', data);
  }

  public async getUserMe (): Promise<AxiosResponse<User>> {
    return await this.axios.get('/users/me');
  }
}

export default new AMAApi(process.env.REACT_APP_API_BASEURL ?? '', 'token');