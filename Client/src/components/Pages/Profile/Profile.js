import authenticated from '../../../hocs/authenticated.js';    
import EditProfile from '../../Other/EditProfile/EditProfile.js';

function Profile({ history, location }) {

    return (
        <EditProfile />
    );
}

export default authenticated(Profile);