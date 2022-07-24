import { makeAutoObservable } from "mobx"
import { http, getToken, setToken, clearToken } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async (userAccount) => {
    const res = await http.post('/user/login', {
      user: userAccount
    })
    this.token = res.data.token
    // Put token into localStorage
    setToken(this.token)
  }
  // 退出登录
  loginOut = () => {
    this.token = ''
    // 清除本地token
    clearToken()
  }
}
export default LoginStore