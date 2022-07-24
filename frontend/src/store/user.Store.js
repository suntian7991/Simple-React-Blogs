// 登录模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }

  getUserInfo = async () => {
    const res = await http.get('/user')
    this.userInfo = res.data.user
  }
}
export default UserStore