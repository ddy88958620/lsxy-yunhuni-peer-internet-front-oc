import jsCookie from 'js-cookie'

class cookies{
  set(key,value){
    jsCookie.set(key, value)
  }
  get(key){
    jsCookie.get(key)
  }
  remove(key){
    jsCookie.remove(key)
  }
}

export default new cookies()