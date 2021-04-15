import moment from 'moment';
import { Card, Space } from 'antd';
import { ArrowRightOutlined, HomeOutlined, FieldTimeOutlined, CarOutlined } from '@ant-design/icons';

function TripInfo({ info, numberUsers }) {
    return (
        <Card loading={info === undefined} title={info ? `${ info?.applicationUserFirstName} ${info?.applicationUserLastName}` : 'loading..'}>
                <p><Space wrap>Start:<FieldTimeOutlined />{info?.leaving ? moment.utc(info.leaving).local().format('hh:mm DD/MM/yyyy') : ''}</Space></p>
                <p><Space wrap>End:<FieldTimeOutlined />{info?.returning ? moment.utc(info.returning).local().format('hh:mm DD/MM/yyyy') : ''}</Space></p>
                <p><Space wrap>From: <HomeOutlined />{info?.cityName}</Space></p>
                <p><Space wrap>To Area: <ArrowRightOutlined />{info?.cragAreaName}</Space></p>
                <p><Space wrap>To Crag: <ArrowRightOutlined />{info?.cragName}</Space></p>
                <p><Space wrap>To Sector: <ArrowRightOutlined />{info?.sectorName}</Space></p>
                {info?.withCar ? <p><Space>With <CarOutlined />Seats Left:{numberUsers}/{info.seats}</Space></p> : ''}
        </Card>
    );
}

export default TripInfo;