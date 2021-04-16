import { FacebookOutlined, GithubOutlined } from '@ant-design/icons';
import { grey } from '@ant-design/colors';
import { Layout, Row, Col, Typography } from 'antd';

const { Footer } = Layout;
const { Title } = Typography;

function PageFooter(props) {
    return (
        <Footer style={{ textAlign: 'center', padding: 0, backgroundColor: '#001433' }}>
            <Row>
                <Col span={12}>
                    <Title level={5} style={{ padding: 10, margin: 0, color: grey[0] }}>
                        Todor Tsankov ©{new Date().getFullYear()}
                    </Title>
                </Col>
                <Col span={12}>
                    <Title level={4} style={{ padding: 10, margin: 0, color: grey[0] }}>
                        <a href="/" target="_blank" rel="noreferrer"><FacebookOutlined /></a> <a href="https://github.com/todor-tsankov/day-tripper" target="_blank" rel="noreferrer"><GithubOutlined /></a>
                    </Title>
                </Col>
            </Row>
        </Footer>
    );
}

export default PageFooter;