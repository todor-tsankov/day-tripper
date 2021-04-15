import { Row, Col, Form, Button, Spin, message } from 'antd';
import { useState, useEffect, useContext } from 'react';

import UserContext from '../../../context/UserContext.js';

import FirstNameInput from '../../FormItems/FirstNameInput/FirstNameInput.js';
import LastNameInput from '../../FormItems/LastNameInput/LastNameInput.js';
import NotificationsInput from '../../FormItems/NotificationsInput/NotificationsInput.js';

import { getUserDetails, updateProfile } from '../../../services/profileService.js';

function EditProfile({ history }) {
    const [user] = useContext(UserContext);

    if (!user) {
        history.push('/login');
    }
    
    const [sending, setSending] = useState(false);
    const [userDetails, setUserDetails] = useState();

    useEffect(() => {
        getUserDetails(user.token).then(x => {
            if (x.code !== 200) {
                message.error(x.message);
                return;
            }

            setUserDetails(x.data);
        });
    }, [user.token]);

    if (!userDetails) {
        return (
            <Row style={{ padding: 50 }} align="center">
                <Spin></Spin>
            </Row>
        );
    }

    const onFinish = async (values) => {
        setSending(true);
        const response = await updateProfile(values, user.token);
        setSending(false);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
    };

    return (
        <Row style={{ padding: '50px' }}>
            <Col xs={{ span: 24 }} md={{ span: 16, offset: 4 }}>
                <Form
                    initialValues={{ ...userDetails }}
                    onFinish={onFinish}
                >
                    <FirstNameInput />
                    <LastNameInput />
                    <NotificationsInput />
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={sending}>Save</Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row >
    );
}

export default EditProfile;