import { Form, Space, Checkbox } from 'antd';

function NotificationsInput() {
    return (
        <Space wrap style={{ marginBottom: 15}}>
            <Form.Item name="facebookNotifications" valuePropName="checked" noStyle>
                <Checkbox>Post to Facebook Page</Checkbox>
            </Form.Item>
            <Form.Item name="emailNotifications" valuePropName="checked" noStyle>
                <Checkbox>Send me SMS Notifications</Checkbox>
            </Form.Item>
            <Form.Item name="smsNotifications" valuePropName="checked" noStyle>
                <Checkbox>Send me Email Notifications</Checkbox>
            </Form.Item>
        </Space>
    );
}

export default NotificationsInput;