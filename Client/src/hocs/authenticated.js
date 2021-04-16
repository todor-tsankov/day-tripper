import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext.js';

function authenticated(Inner) {
    const Outer = (props) => {
        const history = useHistory();
        const location = useLocation();

        const [user] = useContext(UserContext);

        if (!user) {
            history.push({ pathname: '/login', state: { back: location.pathname } });
            return null;
        }

        return <Inner {...props} />;
    };

    return Outer;
}

export default authenticated;