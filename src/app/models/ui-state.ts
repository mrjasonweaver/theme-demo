export interface IUiState {
  actionOngoing: boolean;
  message: string;
}

export const initialUiState: IUiState = {
  actionOngoing: false,
  message: ''
};
