import ip from 'icepick';
import {
  AUTH_USER,
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILURE,
  RESET_AUTH
} from '../action_types';

const initialState = ip.freeze({
  fbSignIn: {
    apiStatus: null,
    apiError: null,
    data: null
  },
  profile: null,
  isAuthenticated: false,
});

export default function (state = initialState, action) {
  switch (action.type) {

    case AUTH_USER: {
      state = ip.setIn(state, ['isAuthenticated'], true);
      state = ip.setIn(state, ['profile'], action.payload.profile);
      return state;
    }

    case FACEBOOK_LOGIN_REQUEST: {
      state = ip.setIn(state, ['fbSignIn', 'apiStatus'], 'started');
      state = ip.setIn(state, ['fbSignIn', 'apiError'], null);
      return state;
    }

    case FACEBOOK_LOGIN_SUCCESS: {
      state = ip.setIn(state, ['fbSignIn', 'apiStatus'], 'success');
      state = ip.setIn(state, ['fbSignIn', 'apiError'], null);
      state = ip.setIn(state, ['isAuthenticated'], true);
      state = ip.setIn(state, ['profile'], action.payload.profile);
      return state;
    }

    case FACEBOOK_LOGIN_FAILURE: {
      state = ip.setIn(state, ['fbSignIn', 'apiStatus'], 'failure');
      state = ip.setIn(state, ['fbSignIn', 'apiError'], action.payload);
      return state;
    }

    case RESET_AUTH: {
      state = ip.setIn(state, ['fbSignIn'], initialState.fbSignIn);
      state = ip.setIn(state, ['isAuthenticated'], initialState.isAuthenticated);
      state = ip.setIn(state, ['profile'], initialState.profile);
      return state;
    }

    default:
      return state;
  }
}
