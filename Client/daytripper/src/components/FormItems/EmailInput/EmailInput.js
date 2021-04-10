import { Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function EmailInput() {
    return (
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
    );
}

export default EmailInput;