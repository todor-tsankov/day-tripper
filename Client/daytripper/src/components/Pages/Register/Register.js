import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Space, message } from 'antd';

import EmailInput from '../../FormItems/EmailInput/EmailInput.js';
import FirstNameInput from '../../FormItems/FirstNameInput/FirstNameInput.js';
import LastNameInput from '../../FormItems/LastNameInput/LastNameInput.js';
import PhoneNumberInput from '../../FormItems/PhoneNumberInput/PhoneNumberInput.js';
import PasswordInput from '../../FormItems/PasswordInput/PasswordInput.js';
import ConfirmPassword from '../../FormItems/ConfirmPasswordInput/ConfirmPasswordInput.js';
import NotificationsInput from '../../FormItems/NotificationsInput/NotificationsInput.js';

import { register } from '../../../services/registerService.js';

function Register({ history }) {
    const [sending, setSending] = useState(false);

    const onFinish = async (data) => {
        setSending(true);
        const response = await register(data);
        setSending(false);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
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
                    <EmailInput />
                    <FirstNameInput />
                    <LastNameInput />
                    <PhoneNumberInput />
                    <PasswordInput />
                    <ConfirmPassword />
                    <NotificationsInput />
                    <Form.Item>
                        <Space size={'small'}>
                            <Button type="primary" htmlType="submit" loading={sending}>Register</Button>
                            Already have an account? <Link to="/login">Log in</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
}

export default Register;