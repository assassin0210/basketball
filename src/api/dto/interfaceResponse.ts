export interface ITeamInfo {
  name: string;
  foundationYear: number;
  division: string;
  conference: string;
  imageUrl?: string;
  id: number;
}

export interface iGetTeamType {
  data: ITeamInfo[];
  count: number;
  page: number;
  size: number;
}

export interface IInitialStateInterface extends iGetTeamType {
  visibleMenu: boolean;
}
