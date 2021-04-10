import { Form, DatePicker } from 'antd';

function FromToInput() {
    return (
        <Form.Item
            name="times"
            label="Time"
            rules={[{ required: true }]}
        >
            <DatePicker.RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
            />
        </Form.Item>
    );
}

export default FromToInput;