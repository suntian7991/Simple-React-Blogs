import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import logo from '@/assets/logo.png'

import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Register () {
  const navigate = useNavigate()
  const { registerStore } = useStore()
  const onFinish = async (values) => {
    const { email, password } = values
    try {
      const userInfo = { email, password }
      await registerStore.register(userInfo)
      navigate('/login', { replace: true })
      message.success('Login successfully')
    } catch (err) {
      console.log((err.response.data.errors[0]).msg)
      message.error((err.response?.data?.errors[0]).msg || 'Register failed')
    }
  }

  return (
    <div className="register">
      <Card className="register-container">
        <img className="logo" src={logo} alt="" />
        <Form
          onFinish={onFinish}
          validateTrigger={['onBlur', 'onChange']}
        >
          <Form.Item
            name="email"
            rules={[
              {
                pattern: /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/,
                message: 'Incorrect email format!',
                validateTrigger: 'onBlur'
              },
              { required: true, message: 'Please enter your email!' }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Please enter your email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { min: 6, message: 'Password length should not less than 6!', validateTrigger: 'onBlur' },
              { required: true, message: 'Please enter your password' }
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Please enter your password"
              minLength={6} />
          </Form.Item>

          <Form.Item>
            {/* <!-- 渲染Button组件为submit按钮 --> */}
            <Button type="primary" htmlType="submit" size="large" block>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Register