import domain from '../config/domain'

$.extend({
  get: function(url,data){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: domain.API_ROOT + url,
        data: data,
        success:(e) => {
          resolve(JSON.parse(e))
        },
        error:(e) => {
          if( e.status == 401) {
            window.location = '/#!/auth/login'
          }
          reject(e)
        },
      })
    })
  },
  post: function(url,data){
    return new Promise((resolve, reject) => {

      $.ajax({
        type: 'post',
        url: domain.API_ROOT + url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: (e) => {
          resolve(e)
        },
        error: (e) => {
          if( e.status == 401) {
            window.location = '/#!/auth/login'
          }
          reject(e)
        }
      })
    })
  },
  patch: function(url,data){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'patch',
        url: domain.API_ROOT + url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: (e) => {
          resolve(e)
        },
        error: (e) => {
          if( e.status == 401) {
            window.location = '/#!/auth/login'
          }
          reject(e)
        }
      })
    })
  },
  put: function(url,data){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'put',
        url: domain.API_ROOT + url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: (e) => {
          resolve(e)
        },
        error: (e) => {
          if( e.status == 401) {
            window.location = '/#!/auth/login'
          }
          reject(e)
        }
      })
    })
  },
  delete: function(url,data){
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'delete',
        url: domain.API_ROOT + url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        processData: false,
        success: (e) => {
          resolve(e)
        },
        error: (e) => {
          if( e.status == 401) {
            window.location = '/#!/auth/login'
          }
          reject(e)
        }
      })
    })
  },
})
