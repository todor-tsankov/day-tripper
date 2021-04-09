import { Link } from 'react-router-dom';
import { List, Avatar, Space, Button, Skeleton } from 'antd';
import { UserOutlined, ArrowRightOutlined, HomeOutlined, FieldTimeOutlined } from '@ant-design/icons';

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
                <Button onClick={onLoadMore}>Load More</Button>
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
                    actions={[<Link to={'/details/' + item.id}>More</Link>]}
                >
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={
                                <UserOutlined />
                                //<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<h3>{item.applicationUserFirstName + ' ' + item.applicationUserLastName}</h3>}
                            description={
                                <Space wrap>
                                    <div><FieldTimeOutlined /> {item.leaving.replace('T', ' ').slice(0, 16)}</div>
                                    <div><FieldTimeOutlined /> {item.returning.replace('T', ' ').slice(0, 16)}</div>
                                    <div><HomeOutlined /> {item.cityName}</div>
                                    <ArrowRightOutlined />{item.cragAreaName}|{item.cragName}|{item.sectorName}
                                </Space>
                            }
                        />
                    </Skeleton >
                </List.Item >
            )}
        />);
}

export default LoadMoreTripList;