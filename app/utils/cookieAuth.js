import Cookie from 'js-cookie'
import domain from '../config/domain.js'

console.log(domain);
const cookieConfig =  {domain: domain.COOKIE_DOMAIN, expires: 3}

export function saveCookie(key ,value) {

  Cookie.set(key, value)
  //IE 浏览器下不支持 cookieConfig
  //Cookie.set(key, value, cookieConfig)
}

export function removeCookie(key) {
  Cookie.remove(key)
  //IE 浏览器下不支持 cookieConfig
  //Cookie.remove(key, cookieConfig)
}

export function getCookie(key) {
  return Cookie.get(key)
}
