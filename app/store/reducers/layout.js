import ip from 'icepick';
import {TOAST_UPDATE} from '../action_types'

const initialState = ip.freeze({
  toast: {
    show: false,
    type: null, //'success', 'error', 'warning'
    content: {
      title: '',
      description: ''
    },
    interval: null
  }
});

export default function (state = initialState, action) {
  switch (action.type) {

    case TOAST_UPDATE: {
      state = ip.setIn(state, ['toast'], action.payload);
      return state;
    }

    default:
      return state;

  }
}
