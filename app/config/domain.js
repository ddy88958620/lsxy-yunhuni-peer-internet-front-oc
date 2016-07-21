// mock for test
// const API_ROOT = 'http://localhost:8080/app/mock'

const YUNHUNIHOST = window.location.hostname
const YUNHUNIHOSTPORT = window.location.port ? window.location.port : 80
const API_ROOT = 'http://'+YUNHUNIHOST+':'+YUNHUNIHOSTPORT+'/app/mock'
const COOKIE_DOMAIN =  YUNHUNIHOST


export default {
  API_ROOT,
  COOKIE_DOMAIN,
}
