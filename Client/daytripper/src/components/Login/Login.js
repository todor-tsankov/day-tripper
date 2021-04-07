import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Space } from 'antd';

import UserContext from '../../context/UserContext.js';
import { login } from '../../services/loginService.js';

function Login({ history }) {
    const [user, setUser] = useContext(UserContext);

    const onFinish = async (values) => {
        const result = await login(values.email, values.password, values.rememberMe);

        console.log(result);

        setUser({
            token: result.token,
            expiration: result.expiration,
        });

        history.push('/');
    };

    return (
        <Row style={{ padding: '50px' }}>
            <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
                <Form
                    name="normal_login"
                    className="login-form"
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
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Space size={'small'}>
                            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            or <Link to="/register">Register now!</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;