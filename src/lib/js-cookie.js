import Cookies from 'js-cookie';

/**
 * Set cookies
 * @param {Object} cookies
 */
export const setCookies = (cookies) => {
  Object.keys(cookies).forEach((key) => {
    Cookies.set(key, cookies[key]);
  });
};

/**
 * Get cookies
 * @param {string} key
 * @returns {string}
 */
export const getCookies = (key) => Cookies.get(key);

/**
 * Get all cookies
 * @returns {Object}
 */
export const getAllCookies = () => Cookies.get();

export const removeAllCookies = () => {
  Object.keys(Cookies.get()).forEach((key) => {
    Cookies.remove(key);
  });
};
