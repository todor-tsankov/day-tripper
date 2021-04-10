import { usecontext, useState, useEffect } from 'react';

import EditProfile from '../EditProfile/EditProfile.js';
import ChangePassword from '../ChangePassword/ChangePassword.js';
import ConfirmEmail from '../ConfirmEmail/ConfirmEmail.js';
import ConfirmPhone from '../ConfirmPhone/ConfirmPhone.js';

function Profile() {
    return (
        <EditProfile/>
    );
}

export default Profile;