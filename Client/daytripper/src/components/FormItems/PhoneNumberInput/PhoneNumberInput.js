import { Form, Input } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

function PhoneNumberInput() {
    return (
        <Form.Item name="phoneNumber">
            <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone Number (optional)"
            />
        </Form.Item>
    );
}

export default PhoneNumberInput;