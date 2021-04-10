import {Form, Input} from 'antd';
import { LockOutlined } from '@ant-design/icons';

function ConfirmPasswordInput() {
    return (
        <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Repeat Password"
            />
        </Form.Item>
    );
}

export default ConfirmPasswordInput;