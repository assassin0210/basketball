export interface IPlayerInfo {
  name: string;
  number: number;
  position: string;
  team: number;
  birthday: string;
  height: number;
  weight: number;
  avatarUrl: string;
  id: number;
}

export interface IGetPlayersType {
  data: IPlayerInfo[];
  count: number;
  page: number;
  size: number;
}

export interface IInitialStatePlayer extends IGetPlayersType {
  positions: [];
  error: boolean;
  isFetching: boolean;
  resultSearch: string;
  currentPlayer: IPlayerInfo;
}
