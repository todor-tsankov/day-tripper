import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

function ServerError() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong with the server."
            extra={<Button type="primary"><Link to="/">Back Home</Link> </Button>}
        />
    );
}

export default ServerError;
