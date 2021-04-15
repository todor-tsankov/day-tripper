import moment from 'moment';
import { Link } from 'react-router-dom';
import { List, Space, Button, Skeleton } from 'antd';
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
                            }
                            title={item.applicationUserFirstName + ' ' + item.applicationUserLastName}
                            description={
                                <Space wrap>
                                    <div><FieldTimeOutlined /> {item?.leaving ? moment.utc(item.leaving).local().format('hh:mm DD/MM/yyyy') : ''}</div>
                                    <div><FieldTimeOutlined /> {item?.returning ? moment.utc(item.returning).local().format('hh:mm DD/MM/yyyy') : ''}</div>
                                    <div><HomeOutlined /> {item.cityName}</div>
                                    <ArrowRightOutlined />{item.cragName}
                                </Space>
                            }
                        />
                    </Skeleton >
                </List.Item >
            )}
        />);
}

export default LoadMoreTripList;