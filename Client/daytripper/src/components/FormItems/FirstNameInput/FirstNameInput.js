import { Form, Input } from 'antd';

function FirstNameInput() {
    return (
        <Form.Item
            name="firstName"
            rules={[
                {
                    required: true,
                    message: 'Please enter your First Name!',
                    transform: x => x?.trim(),
                },
                {
                    max: 50,
                    message: 'First Name can\'t be more than 50 characters',
                },
            ]}
        >
            <Input placeholder="First Name" />
        </Form.Item>
    );
}

export default FirstNameInput;