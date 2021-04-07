import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { SearchOutlined, UserOutlined, CalendarOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';

import UserContext from '../../context/UserContext.js';

const { Header } = Layout;

function PageHeader(props) {
    const location = useLocation();
    const [user] = useContext(UserContext);

    const userNav = (
        <>
            <Menu.Item key="/profile"><Link to="/profile"><UserOutlined />Profile</Link></Menu.Item>
            <Menu.Item key="/add"><Link to="/add"><PlusOutlined />Add</Link></Menu.Item>
        </>
    );

    const guestNav = (
        <>
            <Menu.Item key="/login"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="/register"><Link to="/register">Register</Link></Menu.Item>
        </>
    );

    return (
        <Header>
            <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
                <Menu.Item key="/"><Link to="/"><HomeOutlined />Home</Link></Menu.Item>
                <Menu.Item key="/calendar"><Link to="/calendar"><CalendarOutlined />Calendar</Link></Menu.Item>
                <Menu.Item key="/search"><Link to="/search"><SearchOutlined />Search</Link></Menu.Item>
                {user ? userNav : guestNav}
            </Menu>
        </Header>
    );
}

export default PageHeader;