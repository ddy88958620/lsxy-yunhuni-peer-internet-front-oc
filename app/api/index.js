import {
  AuthResource,
} from './resource.js'


export default {
  localLogin(user){
    return AuthResource.save(user)
  }
}
