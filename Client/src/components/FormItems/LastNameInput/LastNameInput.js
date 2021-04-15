import { Form, Input } from 'antd';

function LastNameInput() {
    return (
        <Form.Item
            name="lastName"
            rules={[
                {
                    required: true,
                    message: 'Please enter your Last Name!',
                    transform: x => x?.trim(),
                },
                {
                    max: 50,
                    message: 'Last Name can\'t be more than 50 characters',
                },
            ]}
        >
            <Input placeholder="Last Name" />
        </Form.Item>
    );
}

export default LastNameInput;