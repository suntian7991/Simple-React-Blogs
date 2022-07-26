import React from "react"
import LoginStore from './login.Store'
import UserStore from "./user.Store"
import ChannelStore from './channel.Store'
import RegisterStore from "./register.Store"


class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
    this.registerStore = new RegisterStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()

  }
}
// 导入useStore方法供组件使用数据
const rootStore = new RootStore()
const StoresContext = React.createContext(rootStore)
const useStore = () => React.useContext(StoresContext)
export { useStore }