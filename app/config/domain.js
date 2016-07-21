// mock for test
// const API_ROOT = 'http://localhost:8080/app/mock'
//
const ADMINPROCESSENV = process.env.NODE_ENV
console.info('NODE_ENV', ADMINPROCESSENV);

const YUNHUNIHOST = window.location.hostname
const YUNHUNIHOSTPORT = window.location.port ? window.location.port : 80
const MOCK = ADMINPROCESSENV ? '/mock' : '/app/mock'
const API_ROOT = 'http://'+YUNHUNIHOST + ':' + YUNHUNIHOSTPORT + MOCK
const COOKIE_DOMAIN =  YUNHUNIHOST


export default {
  API_ROOT,
  COOKIE_DOMAIN,
}
