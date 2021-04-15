import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

function Unauthorized() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
        />
    );
}

export default Unauthorized;