import { Card, Space } from 'antd';
import { ArrowRightOutlined, HomeOutlined, FieldTimeOutlined, CarOutlined } from '@ant-design/icons';

function TripInfo({ info, numberUsers }) {
    return (
        <Card loading={info === undefined} title={`${info?.applicationUserFirstName} ${info?.applicationUserLastName}`}>
                <p><Space wrap>Start:<FieldTimeOutlined />{info?.leaving.replace('T', ' ').slice(0, 16)}</Space></p>
                <p><Space wrap>End:<FieldTimeOutlined />{info?.returning.replace('T', ' ').slice(0, 16)}</Space></p>
                <p><Space wrap>From: <HomeOutlined />{info?.cityName}</Space></p>
                <p><Space wrap>To Area: <ArrowRightOutlined />{info?.cragAreaName}</Space></p>
                <p><Space wrap>To Crag: <ArrowRightOutlined />{info?.cragName}</Space></p>
                <p><Space wrap>To Sector: <ArrowRightOutlined />{info?.sectorName}</Space></p>
                {info?.withCar ? <p><Space>With <CarOutlined />Seats Left:{numberUsers}/{info.seats}</Space></p> : ''}
        </Card>
    );
}

export default TripInfo;