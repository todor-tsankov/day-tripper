import { useContext } from 'react';

import EditProfile from '../../Other/EditProfile/EditProfile.js';
import UserContext from '../../../context/UserContext.js';

function Profile({ history, location }) {
    const [user] = useContext(UserContext);

    if (!user) {
        history.push({ pathname: '/login', state: { back: location.pathname } });
    }

    return (
        <EditProfile />
    );
}

export default Profile;