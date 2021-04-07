import { Link } from 'react-router-dom';

import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Space } from 'antd';

import { register } from '../../services/registerService.js';

function Register({ history }) {
    

    const onFinish = async (data) => {
        console.log(data);
        await register(data);
        history.push('/login');
    };

    return (
        <Row style={{ padding: '50px' }}>
            <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
                <Form
                    name="normal_register"
                    className="register-form"
                    initialValues={{
                        facebookNotifications: true,
                        emailNotifications: true,
                        smsNotifications: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: 'The input is not valid E-mail!',
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
                                transform: x => x?.trim(),
                            },
                            {
                                max: 50,
                                message: 'First Name can\'t be more than 50 characters',
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
                                transform: x => x?.trim(),
                            },
                            {
                                max: 50,
                                message: 'Last Name can\'t be more than 50 characters',
                            },
                        ]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item name="phoneNumber">
                        <Input
                            prefix={<PhoneOutlined className="site-form-item-icon" />}
                            placeholder="Phone Number (optional)"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            {
                                min: 6,
                                message: 'Password can\'t be less than 6 characters',
                            }
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
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