export interface AsyncData<T> {
  payload?: T | null
  error?: RespError
};

export interface RespError {
  name: string
  message: string
}
