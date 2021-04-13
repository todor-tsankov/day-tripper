import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Form, Button,  Row, Col, Space, message } from 'antd';

import EmailInput from '../FormItems/EmailInput/EmailInput.js';
import PasswordInput from '../FormItems/PasswordInput/PasswordInput.js';
import RememberMeCheckbox from '../FormItems/RememberMeCheckbox/RememberMeCheckbox.js';

import UserContext from '../../context/UserContext.js';
import { login } from '../../services/loginService.js';

function Login({ history }) {
    const [sending, setSending] = useState(false);
    const [,setUser] = useContext(UserContext);

    const onFinish = async (values) => {
        setSending(true);
        const result = await login(values.email, values.password, values.rememberMe);
        setSending(false);

        console.log(result);
        if(result.code !== 200){
            message.error(result.message);
            return;
        }

        const data = result.data;

        setUser({
            userId: data.userId,
            token: data.token,
            expiration: data.expiration,
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
                            <Button type="primary" htmlType="submit" loading={sending}>Log in</Button>
                            or <Link to="/register">Register now!</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;