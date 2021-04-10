import { Form, Row, Checkbox } from 'antd';

function NotificationsInput() {
    return (
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
    );
}

export default NotificationsInput;