import momentJs from 'moment';
import { useState, useEffect } from 'react';

import { cyan } from '@ant-design/colors';
import { CarOutlined } from '@ant-design/icons';
import { Calendar as AntCalendar, Card, Space, Row, Col, Spin, message } from 'antd';

import { getMonthlyTrips } from '../../../services/calendarService.js';

function Calendar({ history }) {
    const color = (num) => {
        if (num > 10) {
            return cyan[10];
        }

        return cyan[num - 1];
    };

    const [month, setMonth] = useState(momentJs().utc().month() + 1);
    const [monthInfo, setMonthInfo] = useState();

    const getInfo = (moment) => {
        const utc = moment.utc();
        const newMonth = utc.month() + 1;

        setMonth(newMonth);
        getMonthlyTrips(utc.year(), newMonth).then(x => {
            if (x.code !== 200) {
                message.error(x.message);
            }

            setMonthInfo(x.data);
        });
    };

    useEffect(() => {
        getInfo(momentJs());
    }, []);

    const dateCellRender = (moment) => {
        const trips = monthInfo ? monthInfo[moment.utc().date()] : undefined;

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

        setMonthInfo();
        getInfo(moment);
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