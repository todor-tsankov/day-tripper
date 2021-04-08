import { Link } from 'react-router-dom';
import { List, Avatar, Button, Skeleton } from 'antd';

function LoadMoreTripList({ list, loading, initLoading, onLoadMore, end }) {
    const loadMore =
        !initLoading && !loading && !end ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
                <List.Item
                    actions={[<Link to={'/details/' + item.id}>more</Link>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<div>{item.applicationUserFirstName + ' ' + item.applicationUserLastName}</div>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </Skeleton>
                </List.Item>
            )}
        />);
}

export default LoadMoreTripList;