import { Layout } from 'antd';

const { Footer } = Layout;

function PageFooter(props) {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Todor Tsankov ©{new Date().getFullYear()}
        </Footer>
    );
}

export default PageFooter;