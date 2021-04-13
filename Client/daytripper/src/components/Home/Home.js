import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Typography, Space, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import UserContext from '../../context/UserContext.js';

const { Title } = Typography;

function Home() {
    const [user] = useContext(UserContext);

    return (
        <Row align={'center'} justify={'center'} style={{ padding: 50, textAlign: 'center' }}>
            <Col span={24} style={{ paddingTop: 100, paddingBottom: 50 }}>
                <Title style={{ fontFamily: '-moz-initial' }}>Projects are calling...</Title>
            </Col>
            <Col span={24} style={{ paddingTop: 50, paddingBottom: 50 }}>
                <Space>
                    <Button type="primary" size={'large'}><Link to={user ? '/calendar' : '/register'}>Answer</Link></Button>
                    <Button size={'large'} danger>Decline</Button>
                </Space>
            </Col>
        </Row>
    );
}

export default Home;