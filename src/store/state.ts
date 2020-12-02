import {UserModel} from '../models/UserModel';

export interface AppState {
  users?: UserModel[];
  editMode?: boolean;
}

export const InitialAppState = {
  users: [],
  editMode: false,
};
