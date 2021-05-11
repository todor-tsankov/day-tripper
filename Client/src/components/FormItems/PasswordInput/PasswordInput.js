import { Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

function PasswordInput({ name, placeholder }) {
    return (
        <Form.Item
            name={name ? name : 'password'}
            rules={[
                {
                    required: true,
                    message: 'Please enter your Password!',
                },
                {
                    min: 6,
                    message: 'Password can\'t be less than 6 characters',
                }
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={placeholder ? placeholder : 'Password'}
            />
        </Form.Item>
    );
}

export default PasswordInput;