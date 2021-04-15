import { usecontext, useState, useEffect } from 'react';

import EditProfile from '../../Other/EditProfile/EditProfile.js';
import ChangePassword from '../../Other/ChangePassword/ChangePassword.js';
import ConfirmEmail from '../../Other/ConfirmEmail/ConfirmEmail.js';
import ConfirmPhone from '../../Other/ConfirmPhone/ConfirmPhone.js';

function Profile() {
    return (
        <EditProfile/>
    );
}

export default Profile;