export interface IInitialStateAuth {
  showError: boolean;
  token: string | null;
  isFetching: boolean;
  isAuth: boolean;
  name: string | null;
  avatarUrl: string | null;
}
export interface UserType {
  name: string;
  avatarUrl: string;
  token: string;
}

export type onSubmitDataFormType = {
  userName?: string;
  login: string;
  password: string;
  doublePass?: string;
};
