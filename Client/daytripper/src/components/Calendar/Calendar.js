import momentJs from 'moment';
import { useState, useEffect } from 'react';

import { cyan } from '@ant-design/colors';
import { CarOutlined } from '@ant-design/icons';
import { Calendar as AntCalendar, Card, Space, Row, Col, Spin } from 'antd';

import { getMonthlyTrips } from '../../services/calendarService.js';

function Calendar({ history }) {
    const color = (num) => {
        if (num > 10) {
            return cyan[10];
        }

        return cyan[num - 1];
    };

    const [month, setMonth] = useState(momentJs().month() + 1);
    const [monthInfo, setMonthInfo] = useState();

    useEffect(() => {
        setMonth(momentJs().month() + 1);
        getMonthlyTrips(momentJs().year(), momentJs().month() + 1).then(x => setMonthInfo(x));
    }, []);

    const dateCellRender = (moment) => {
        const trips = monthInfo ? monthInfo[moment.date()] : undefined;

        if (!trips || moment.month() + 1 !== month) {
            return null;
        }

        return (
            <Card style={{ backgroundColor: color(trips), textAlign: 'center' }}>
                <Space>
                    {trips}<CarOutlined />
                </Space>
            </Card>
        );
    };

    const onPanelChange = (moment, mode) => {
        if (mode === 'year') {
            return;
        }

        const utc = moment.utc();

        setMonthInfo();
        setMonth(utc.month() + 1);
        getMonthlyTrips(utc.year(), utc.month() + 1).then(x => setMonthInfo(x));
    };

    const onSelect = (moment) => {
        const utc = moment.utc();

        if (utc.month() + 1 !== month) {
            return;
        }

        history.push('/search/' + encodeURIComponent(utc.format()));
    };

    let index = 1;

    return (
        <Row style={{ marginTop: 40, textAlign: 'center', align: 'center' }}>
            <Col xs={{ span: 2 }} md={{ span: 1 }}>
                <div style={{ padding: 2, textAlign: 'center' }}>0</div>
            </Col>
            {cyan.map(x => (
                <Col key={x} xs={{ span: 2 }} md={{ span: 1 }}>
                    <div style={{ backgroundColor: x, padding: 2, textAlign: 'center' }}>{index === 10 ? '10+' : index++}</div>
                </Col>
            ))}
            <Col span={2}>
                {!monthInfo ? <Spin></Spin> : null}
            </Col>
            <Col span={24}>
                <AntCalendar
                    onSelect={onSelect}
                    dateCellRender={dateCellRender}
                    onPanelChange={onPanelChange}
                    style={{ padding: '30px', marginTop: 10 }}
                />
            </Col>
        </Row>
    );
}

export default Calendar;