import axios, { AxiosInstance, AxiosResponse } from 'axios';
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

  public setToken (token: string): void {
    this.axios.defaults.headers.authorization = 'Bearer ' + token;
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken (): void {
    delete this.axios.defaults.headers.authorization;
    localStorage.removeItem(this.tokenKey);
  }

  public async getDataFromFromRequest (request: Request): Promise<object> {
    const data = await request.formData();
    return Object.fromEntries(data);
  }

  public async signIn (data: any): Promise<AxiosResponse<{ token: string }>> {
    return await this.axios.post('/signin', data);
  }

  public async signUp (data: any): Promise<AxiosResponse<IUser>> {
    return await this.axios.post('/signup', data);
  }

  public async getUserMe (): Promise<IUser | null> {
    try {
      const responce = await this.axios.get('/users/me');
      return responce.data;
    } catch (err: any) {
      if (err.code !== 'ERR_NETWORK') {
        this.removeToken();
        return null;
      }
      throw new Error('Api not responding!');
    }
  }

  public async getQuestionsForMe (): Promise<IQuestion[]> {
    const responce = await this.axios.get('/questions/me');
    return responce.data;
  }

  public async getMyQuestions (): Promise<IQuestion[]> {
    const responce = await this.axios.get('/questions/my');
    return responce.data;
  }
}

export default new AMAApi(process.env.REACT_APP_API_BASEURL ?? '', 'token');
