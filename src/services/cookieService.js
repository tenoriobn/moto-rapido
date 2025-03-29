import Cookies from "js-cookie";

export const saveCookieData = (data) => {
  const expirationUserDataInfo = new Date(new Date().getTime() + 3 * 60 * 60 * 1000);
  Cookies.set('userDataInfo', JSON.stringify(data), { expires: expirationUserDataInfo });
};

export const removeCookieData = () => {
  Cookies.remove('userDataInfo');
};

export const getCookieData = (cookieName) => {
  const cookieData = Cookies.get(cookieName);
  if (cookieData) return cookieData ? JSON.parse(cookieData) : null;
};

export const getToken = (cookieName) => {
  const data = getCookieData(cookieName);
  return data?.token || null;
};