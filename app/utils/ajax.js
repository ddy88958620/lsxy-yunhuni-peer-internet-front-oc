import { host} from '../config/main'

$.extend({
  get({url,data}){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: host.api + url,
        success:(e) => {
          resolve(e)
        },
        error:(e) => {
          reject(e)
        }
      })
    })
  }
})
