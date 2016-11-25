import jsCookies from 'js-cookie'
class Cookies {
  set (key, value) {
    jsCookies.set(key, value)
  }
  get (key) {
    return jsCookies.get(key)
  }
  remove (key) {
    jsCookies.remove(key)
  }
}
export default new Cookies()
