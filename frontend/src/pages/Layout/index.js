
import { Button, Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined, DiffOutlined,
  EditOutlined, LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'


const { Header, Sider } = Layout

const SiteLaylout = () => {

  const location = useLocation()
  const selectedKey = location.pathname

  const { userStore, loginStore, channelStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo()
    channelStore.loadChannelList()
  }, [userStore, channelStore])

  const navigate = useNavigate()
  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header" >
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">
            Hello,{userStore.userInfo.email}
            {/* Hello,{userStore.userInfo.profile.nickname ? userStore.userInfo.profile.nickname : userStore.userInfo.email} */}
          </span>
          <Button className="user-logout">
            <Popconfirm title="Sure to logout?" okText="Sure" cancelText="Cancel" onConfirm={onLogout}>
              <LogoutOutlined /> Logout
            </Popconfirm>
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          {/* 高亮原理：selectedKeys === item key */}
          {/* 获取当前激活的path路径 */}
          <Menu
            mode="inline"
            theme="light"
            //defaultSelectedKeys={['1']}
            selectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">Overview</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">Articles</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">Publish</Link>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 放置二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(SiteLaylout)