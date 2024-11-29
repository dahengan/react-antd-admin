import React, { useState, useEffect } from 'react'
import './index.scss'
import { Form, Input, Row, Col, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync } from '@/store/modules/user'
import { getCaptchaId, login } from '@/api/user'
import { message } from 'antd'


export default function Login() {

  useSelector((state) => {
    // console.log(state)
  })

  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: '',
    captchaId: ''
  })
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCaptchaIdFn()
  }, [])

  function handleChange(name, value) {
    setFormData({ ...formData, [name]: value })
  }

  // 登录
  function handleLogin() {
    form.validateFields().then(() => {
      setLoading(true)

      dispatch(loginAsync(formData)).then(data => {
        if (data.code === 1) {
          // this.$router.push(window.configRoute)
        } else {
          message.error(data.message)
          getCaptchaIdFn()
        }

        setLoading(false)
      })
        .catch(() => {
          setLoading(false)
          getCaptchaIdFn()
        })


    }).catch((errorInfo) => {
      return errorInfo
    })
  }

  async function getCaptchaIdFn() {
    try {
      const result = await getCaptchaId()
      if (result.code === 1) {
        setFormData({ ...formData, captchaId: result.data })

        setImgUrl(`${process.env.REACT_APP_BASE_API}/sso/captcha/image?captchaId=${result.data}`)

      }
    } catch (error) {
      return error
    }
  }

  return (
    <div className='Login'>
      <div className='Login_form'>
        <div className='Login_form_title'>后台管理平台</div>

        <div className='Login_form_content'>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            >
              <Input
                value={formData.username}
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!'
                }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col span={14}>
                <Form.Item
                  name="captcha"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码!'
                    }
                  ]}
                >
                  <Input placeholder="请输入验证码" onChange={(e) => handleChange('captcha', e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={10}>
                {
                  imgUrl === '' ?
                    <Button className='Login_form_content_charbtn' onClick={getCaptchaIdFn}>点击获取验证码</Button> :
                    <img className="Login_form_content_charImg" src={imgUrl} alt="验证码" />
                }
              </Col>
            </Row>

            <Button type='primary' className='Login_form_content_charbtn' onClick={handleLogin} loading={loading} >登录</Button>

          </Form>
        </div>
      </div>
    </div>
  )
}
