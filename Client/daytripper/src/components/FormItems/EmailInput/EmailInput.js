import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function EmailInput() {
    return (
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
    );
}

export default EmailInput;