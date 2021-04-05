import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Space } from 'antd';

import { loginService } from '../../services/loginService.js';

function Register() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Row style={{ padding: '50px' }}>
            <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your First Name!',
                            },
                        ]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Last Name!',
                            },
                        ]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Phone Number!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Phone Number"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repeatPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Repeat Password"
                        />
                    </Form.Item>
                    <Row>
                        <Form.Item label={'Notifications:'}>
                            <Form.Item name="facebookNotifications" valuePropName="checked" noStyle>
                                <Checkbox>Facebook</Checkbox>
                            </Form.Item>
                            <Form.Item name="emailNotifications" valuePropName="checked" noStyle>
                                <Checkbox>Email</Checkbox>
                            </Form.Item>
                            <Form.Item name="smsNotifications" valuePropName="checked" noStyle>
                                <Checkbox>Sms</Checkbox>
                            </Form.Item>
                        </Form.Item>
                    </Row>
                    <Form.Item>
                        <Space size={'small'}>
                            <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
                            Already have an account? <Link to="/login">Log in</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
}

export default Register;