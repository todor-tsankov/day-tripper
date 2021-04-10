import { Card, Space } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

function CommentCard({ comment, loading }) {
    return (
        <Card loading={loading} title={<Space><CommentOutlined />Comment</Space>}>
            <p>{comment}</p>
        </Card>
    );
}

export default CommentCard;