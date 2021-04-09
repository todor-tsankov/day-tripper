import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext.js';

import { Row, Col, Space } from 'antd';

import { getTripDetails } from '../../services/detailsService.js';
import { getUserTrips, joinTrip, leaveTrip } from '../../services/userTripsService.js';
import { getIsFollower, postFollow, deleteFollow } from '../../services/followsService.js';

import TripInfo from '../TripInfo/TripInfo.js';
import UsersInTripTable from '../UsersInTripTable/UsersInTripTable.js';

function Details({ match }) {
    const tripId = match.params.tripId;

    const [user] = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState();
    const [users, setUsers] = useState([]);
    const [isFollower, setIsFollower] = useState(false);

    useEffect(() => {
        getTripDetails(tripId).then(x => {
            setTripInfo(x);
            getIsFollower(x.applicationUserId, user.token).then(x => setIsFollower(x));
        });

        getUserTrips(tripId).then(x => setUsers(x));
    }, [tripId, user.token]);

    return (
        <Row style={{ padding: 30 }} justify="center">
            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
                <TripInfo info={tripInfo} isFollower={isFollower} numberUsers={users.length} />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
                <UsersInTripTable users={users} />
            </Col>
        </Row >
    );
}

export default Details;