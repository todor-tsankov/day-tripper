import { Link } from 'react-router-dom';
import { Row, Col, Typography, Space, Button } from 'antd';

import Decline from '../Decline/Decline.js';

const { Title } = Typography;

function Home() {
    return (
        <Row align={'center'} justify={'center'} style={{ padding: 50, textAlign: 'center' }}>
            <Col span={24} style={{ paddingTop: 100, paddingBottom: 50 }}>
                <Title style={{ fontFamily: '-moz-initial' }}>Projects are calling...</Title>
            </Col>
            <Col span={24} style={{ paddingTop: 50, paddingBottom: 50 }}>
                <Space>
                    <Button type="primary" size={'large'}><Link to="/calendar">Answer</Link></Button>
                    <Decline first={true}>
                        <Button size={'large'} danger>Decline</Button>
                    </Decline>
                </Space>
            </Col>
        </Row>
    );
}

export default Home;