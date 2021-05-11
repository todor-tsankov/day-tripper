import { useContext, useState } from 'react';
import { Form, Col, Button, message } from 'antd';

import { changePassword } from '../../../services/changePasswordService.js';

import UserContext from '../../../context/UserContext.js';
import PasswordInput from '../../FormItems/PasswordInput/PasswordInput.js';
import ConfirmPasswordInput from '../../FormItems/ConfirmPasswordInput/ConfirmPasswordInput.js';

function ChangePassword() {
    const [sending, setSending] = useState(false);
    const [user] = useContext(UserContext);

    const onFinish = async (values) => {
        setSending(true);
        const response = await changePassword(values, user.token);
        setSending(false);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
    };

    return (
        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{padding: 10}}>
            <Form
                onFinish={onFinish}
            >
                <PasswordInput name="oldPassword" placeholder="Old Password" />
                <PasswordInput placeholder="New Password" />
                <ConfirmPasswordInput />
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={sending}>Change Password</Button>
                </Form.Item>
            </Form>
        </Col>
    );
}

export default ChangePassword;