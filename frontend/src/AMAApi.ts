import { URLSearchParams } from 'url';
import { IQuestion } from './models/Question';
import { IUser } from './models/User';

type Methods = "POST" | "PUT" | "GET" | "DELETE";
export class AMAApi {
  private readonly tokenKey: string;
  private token: string | null;
  private baseURL: string;

  constructor (baseURL: string, tokenKey: string) {
    this.tokenKey = tokenKey;
    this.baseURL = baseURL;
    this.token = localStorage.getItem(tokenKey);
  }

  private async _fetch<T = any> (url :  RequestInfo | URL, method: Methods = "GET", body?: Object | string) : Promise<T> {
    const jsonBody = typeof body === "object" ? JSON.stringify(body) : body;
    const response = await fetch(this.baseURL + url, {
      body: jsonBody,
      method,
      headers: {
        "content-type": "application/json",
        authorization: this.token ? "Bearer " + this.token : ""
      }
    });
    const json = await response.json();
    if (response.ok) return json;
    throw new Error(json.message);
  }

  public getToken (): string | null {
    return this.token;
  }

  public setToken (token: string): void {
    this.token = token;
    localStorage.setItem(this.tokenKey, token);
  }

  public removeToken (): void {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
  }

  public async getDataFromFromRequest (request: Request): Promise<any> {
    const data = await request.formData();
    return Object.fromEntries(data);
  }

  public async signIn (data: any): Promise<void> {
    return await this._fetch('/signin', "POST",  data)
      .then((res)=> {
        this.setToken(res.token);
      });
  }

  public async signUp (data: any): Promise<IUser> {
    return await this._fetch('/signup', "POST", data);
  }

  public async getUserMe (): Promise<IUser> {
    return await this._fetch('/users/me');
  }

  public async getUsers (params: URLSearchParams): Promise<IUser[]> {
    return await this._fetch(`/users?${params.toString()}`);
  }

  public async getUser (user: string): Promise<IUser> {
    return await this._fetch(`/users/${user}`);
  }

  public async postQuestion (data: any): Promise<IQuestion> {
    return await this._fetch('/questions', "POST", data);
  }

  public async getQuestions (): Promise<IQuestion[]> {
    return await this._fetch('/questions/me');
  }

  public async getAnswers (user?: string, params?: URLSearchParams): Promise<IQuestion[]> {
    return await this._fetch('/answers' + (user !== undefined ? `/${user}?` : '?') + (params?.toString() ?? ""));
  }

  public async postAnswer (data: any): Promise<IQuestion> {
    return await this._fetch('/answers', "POST", data);
  }

  public async putAnswerLike (id: string): Promise<IQuestion> {
    return await this._fetch(`/answers/${id}/like`, "PUT");
  }

  public async deleteAnswerDislike (id: string): Promise<IQuestion> {
    return await this._fetch(`/answers/${id}/like`, "DELETE");
  }
}

export default new AMAApi(process.env.REACT_APP_API_BASEURL ?? "dsad", 'token');
// process.env.REACT_APP_API_BASEURL
