import { Form, Checkbox } from 'antd';

function RememberMeCheckbox() {
    return (
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
        </Form.Item>
    );
}

export default RememberMeCheckbox;