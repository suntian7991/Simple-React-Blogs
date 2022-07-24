import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class RegisterStore {
  constructor() {
    makeAutoObservable(this)
  }

  register = async (userInfo) => {
    const res = await http.post('/user/register', {
      user: userInfo
    })
  }
}
export default RegisterStore