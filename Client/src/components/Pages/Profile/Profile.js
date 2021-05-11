import { Row } from 'antd';

import authenticated from '../../../hocs/authenticated.js';
import EditProfile from '../../Other/EditProfile/EditProfile.js';
import ChangePassword from '../../Other/ChangePassword/ChangePassword.js';

function Profile({ history, location }) {

    return (
        <Row style={{ padding: '50px' }}>
            <EditProfile />
            <ChangePassword/>
        </Row>
    );
}

export default authenticated(Profile);