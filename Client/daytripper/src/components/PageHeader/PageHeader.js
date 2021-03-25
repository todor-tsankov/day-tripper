import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header } = Layout;

function PageHeader(props) {
    const location = useLocation();

    return (
        <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/calendar"><Link to="/calendar">Calendar</Link></Menu.Item>
                <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
            </Menu>
        </Header>
    );
}

export default PageHeader;