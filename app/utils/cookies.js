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

// function foo (x: number): number {
//   return x + 10
// }
//
// foo('Hello!')

export default new Cookies()
