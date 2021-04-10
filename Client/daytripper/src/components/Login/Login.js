import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, Checkbox, Row, Col, Space } from 'antd';

import EmailInput from '../FormItems/EmailInput/EmailInput.js';
import PasswordInput from '../FormItems/PasswordInput/PasswordInput.js';
import RememberMeCheckbox from '../FormItems/RememberMeCheckbox/RememberMeCheckbox.js';

import UserContext from '../../context/UserContext.js';
import { login } from '../../services/loginService.js';

function Login({ history }) {
    const [user, setUser] = useContext(UserContext);

    const onFinish = async (values) => {
        const result = await login(values.email, values.password, values.rememberMe);

        console.log(result);

        setUser({
            userId: result.userId,
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

                    <EmailInput />
                    <PasswordInput />
                    <RememberMeCheckbox />

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