import {createAction} from 'redux-actions';
import {
  TOAST_UPDATE
} from '../action_types';

export const toastUpdate = createAction(TOAST_UPDATE);
