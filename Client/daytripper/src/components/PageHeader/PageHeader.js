import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, UserOutlined, CalendarOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header } = Layout;

function PageHeader(props) {
    const location = useLocation();

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]}>
                <Menu.Item key="/"><Link to="/"><HomeOutlined />Home</Link></Menu.Item>
                <Menu.Item key="/calendar"><Link to="/calendar"><CalendarOutlined />Calendar</Link></Menu.Item>
                <Menu.Item key="/search"><Link to="/search"><SearchOutlined />Search</Link></Menu.Item>
                <Menu.Item key="/profile"><Link to="/profile"><UserOutlined />Profile</Link></Menu.Item>
                <Menu.Item key="/add"><Link to="/add"><PlusOutlined />Add</Link></Menu.Item>
                <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
            </Menu>
        </Header>
    );
}

export default PageHeader;