import {AppState} from './state';

export const rootReducer = (state: AppState, action: {type: string, payload: any}): AppState => {
  switch (action.type) {
    case 'EDIT_USER':
      return {...state, editMode: action.payload};
    case 'SET_USERS':
      return {...state, users: action.payload};
    default:
      return state;
  }
};
