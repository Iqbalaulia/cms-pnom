import React, { useState } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
} from "antd";
import signinbg from "assets/images/png/img-signin.png";
import { signInModel } from "pages/signIn/data/setting";
import { ApiGetRequest, ApiPostRequest } from "utils/api/config";
import { notificationSuccess, notificationError  } from "utils/general/general";


const SignIn = () => {
  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  const [form] = Form.useForm();
  const { Title } = Typography;
  const { Content } = Layout;

  const [formData, setFormData] = useState(signInModel)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  const handleSubmit = async () => {
     try {
      const validateValue = await form.validateFields()
      if (validateValue) {
        submitSignIn()
      }
     } catch (error) {
      
     }
  }

  const submitSignIn = async () => {
    try {
      let formDataLogin = {
        login: formData.login,
        password: btoa(formData.password)
      }
      
      const response = await ApiPostRequest(`login`, formDataLogin)
      localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
      
      if (response) {
        getAuth()
      }

      notificationSuccess('Berhasil Login')
    } catch (error) {
      notificationError(error)
    } finally {

    }
  }

  const getAuth = async () => {
    try {
      const response = await ApiGetRequest(`auth`)
      localStorage.setItem('userData', JSON.stringify(response.data.data))
      window.location.href = '/dashboard'
    } catch (error) {
      notificationError(error)
    }
  }
  
  
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">PNOM Dashboard</Title>
              <Title className="font-regular text-muted" level={5}>
                Masukkan username dan password dengan benar
              </Title>
              <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="row-col"
                form={form}
              >
                <Form.Item
                  className="username"
                  label="Usernname"
                  name="login"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input
                    name="login"
                    value={formData.login}
                    placeholder="Username" 
                    onChange={handleChange}
                  />
                </Form.Item>
  
                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input 
                    name="password"
                    value={formData.password}
                    placeholder="Password"
                    type="password" 
                    onChange={handleChange}
                  />
                </Form.Item>
  
                <Form.Item
                  name="remember"
                  className="aligin-center"
                  valuePropName="checked"
                >
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>
  
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    style={{ width: "100%" }}
                    htmlType="submit"
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
             
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
}



export default SignIn


