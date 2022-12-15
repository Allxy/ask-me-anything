import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';
import { IQuestion } from './models/Question';
import { IUser } from './models/User';

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

  public getToken (): string | undefined {
    return this.axios.defaults.headers.authorization?.toString();
  }

  public setToken (token: string): void {
    this.axios.defaults.headers.authorization = 'Bearer ' + token;
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken (): void {
    delete this.axios.defaults.headers.authorization;
    localStorage.removeItem(this.tokenKey);
  }

  public async getDataFromFromRequest (request: Request): Promise<any> {
    const data = await request.formData();
    return Object.fromEntries(data);
  }

  public async signIn (data: any): Promise<AxiosResponse<{ token: string }>> {
    return await this.axios.post('/signin', data);
  }

  public async signUp (data: any): Promise<AxiosResponse<IUser>> {
    return await this.axios.post('/signup', data);
  }

  public async getUserMe (): Promise<AxiosResponse<IUser>> {
    return await this.axios.get('/users/me');
  }

  public async getUsers (params: URLSearchParams): Promise<AxiosResponse<IUser[]>> {
    return await this.axios.get('/users', { params });
  }

  public async getUser (user: string): Promise<AxiosResponse<IUser>> {
    return await this.axios.get(`/users/${user}`);
  }

  public async postQuestion (data: any): Promise<AxiosResponse<IQuestion>> {
    return await this.axios.post('/questions', data);
  }

  public async getQuestions (): Promise<AxiosResponse<IQuestion[]>> {
    return await this.axios.get('/questions/me');
  }

  public async getUserAnswers (user: string): Promise<AxiosResponse<IQuestion[]>> {
    return await this.axios.get(`/answers/${user}`);
  }

  public async postAnswer (data: any): Promise<AxiosResponse<IQuestion>> {
    return await this.axios.post('/answers', data);
  }
}

export default new AMAApi(process.env.REACT_APP_API_BASEURL ?? '', 'token');
