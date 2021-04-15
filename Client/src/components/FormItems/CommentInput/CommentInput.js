import { Form, Input } from 'antd';

function CommentInput() {
    return (
        <Form.Item
            name="comment"
            label="Comment"
            rules={[{
                max: 10000
            }]}
        >
            <Input.TextArea
                showCount
                allowClear
                maxLength={10000}
                placeholder="Your comment goes here..."
                autoSize={{ minRows: 3, maxRows: 50 }}
            />
        </Form.Item>
    );
}

export default CommentInput;