import moment from 'moment';
import { Card, Space } from 'antd';
import { ArrowRightOutlined, HomeOutlined, FieldTimeOutlined, CarOutlined } from '@ant-design/icons';

function TripInfo({ info, numberUsers }) {
    return (
        <Card loading={info === undefined} title={info ? `${info?.applicationUserFirstName} ${info?.applicationUserLastName}` : 'loading..'}>
            <Space wrap>Start:<FieldTimeOutlined />{info?.leaving ? moment.utc(info.leaving).local().format('hh:mm DD/MM/yyyy') : ''}</Space><br/>
            <Space wrap>End:<FieldTimeOutlined />{info?.returning ? moment.utc(info.returning).local().format('hh:mm DD/MM/yyyy') : ''}</Space><br/>
            <Space wrap>From: <HomeOutlined />{info?.cityName}</Space><br/>
            <Space wrap>To Area: <ArrowRightOutlined />{info?.cragAreaName}</Space><br/>
            <Space wrap>To Crag: <ArrowRightOutlined />{info?.cragName}</Space><br/>
            <Space wrap>To Sector: <ArrowRightOutlined />{info?.sectorName}</Space><br/>
            {info?.withCar ? <><Space>With <CarOutlined />Seats Left:{numberUsers}/{info.seats}</Space><br/></> : ''}
        </Card>
    );
}

export default TripInfo;