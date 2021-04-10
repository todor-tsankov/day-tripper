import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext.js';

import { Row, Col, Button, Space } from 'antd';

import { getTripDetails } from '../../services/detailsService.js';
import { getUserTrips, joinTrip, leaveTrip } from '../../services/userTripsService.js';
import { getIsFollower, postFollow, deleteFollow } from '../../services/followsService.js';

import TripInfo from '../TripInfo/TripInfo.js';
import UsersInTripTable from '../UsersInTripTable/UsersInTripTable.js';

function Details({ history, match }) {
    const tripId = match.params.tripId;

    const [user] = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState();
    const [users, setUsers] = useState([]);
    const [isInTrip, setIsInTrip] = useState();
    const [isFollower, setIsFollower] = useState();

    const [refreshInfo, setRefreshInfo] = useState(true);
    const [refreshUsers, setRefreshUsers] = useState(false);

    useEffect(() => {
        getTripDetails(tripId).then(x => {
            setTripInfo(x);
            getIsFollower(x.applicationUserId, user.token).then(x => setIsFollower(x.isFollower));
        });
    }, [tripId, user.token, refreshInfo]);

    useEffect(() => {
        getUserTrips(tripId).then(y => {
            setUsers(y);
            setIsInTrip(y.some(z => z.ApplicationUserId === user.Id));
        });
    }, [tripId, user.Id, refreshUsers]);

    const onJoinLeaveTripClick = async () => {
        setIsInTrip();

        if (isInTrip === true) {
            await leaveTrip(tripId, user.token);
        } else if (isInTrip === false) {
            await joinTrip(tripId, user.token);
        }

        setRefreshUsers(x => !x);
    };

    const onFollowUnfollowClick = async () => {
        setIsFollower();

        if (isFollower === true) {
            await deleteFollow(tripInfo.applicationUserId, user.token);
           
        } else if (isFollower === false) {
            await postFollow(tripInfo.applicationUserId, user.token);
        }

        setRefreshInfo(x => !x);
    };

    const onEidtTripClick = (e) => {
        history.push('/edit/' + tripId);
    };

    return (
        <>
            <Row style={{ paddingTop: 30 }} justify="center">
                <Space>
                    {user?.userId === tripInfo?.applicationUserId
                        ? (<Button type="primary" onClick={onEidtTripClick}>Edit Trip</Button>)
                        : (
                            <>
                                <Button onClick={onJoinLeaveTripClick} loading={isInTrip === undefined} type="primary">{isInTrip ? 'Leave Trip' : 'Join Trip'}</Button>
                                <Button onClick={onFollowUnfollowClick} loading={isFollower === undefined}>{isFollower ? 'Unfollow User' : 'Follow User'}</Button>
                            </>
                        )
                    }

                </Space>
            </Row>
            <Row style={{ paddingTop: 10, paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }} justify="center">
                <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
                    <TripInfo info={tripInfo} numberUsers={users.length} />
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
                    <UsersInTripTable users={users} />
                </Col>
            </Row >
        </>
    );
}

export default Details;