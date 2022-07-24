import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import logo from '@/assets/logo.png'

import './index.scss'
import { useStore } from '@/store'
import { useNavigate } from 'react-router-dom'

function Login () {
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async (values) => {
    const { email, password } = values
    try {
      const userAccount = { email, password }
      await loginStore.login(userAccount)
      navigate('/', { replace: true })
      message.success('Login successfully')
    } catch (err) {
      message.error((err.response?.data?.errors[0]).msg || 'Login failed')
    }
  }

  return (
    <div className="login">
      <Card className="login-container">
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
          <Form.Item
            name="remember" valuePropName="checked"
          >
            <Checkbox className="login-checkbox-label">
              Remember me
            </Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Log in
            </Button>
            <br />
            <Button
              type="link" size="large" block
              href='http://localhost:3000/register'
            >Register now!</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login