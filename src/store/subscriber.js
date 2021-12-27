import store from '@/store';
import { removeAllCookies, setCookies } from '@/lib/js-cookie';

store.subscribe(({ type, payload }) => {
  if (type === 'auth/SET_TOKEN') {
    if (payload) {
      setCookies({
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
        exp: payload.exp,
      });
    } else {
      removeAllCookies();
    }
  }
});
