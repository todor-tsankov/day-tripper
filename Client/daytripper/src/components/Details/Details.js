import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext.js';

import { Row, Col, Button, Space, message } from 'antd';

import { getTripDetails } from '../../services/detailsService.js';
import { getUserTrips, joinTrip, leaveTrip } from '../../services/userTripsService.js';
import { getIsFollower, postFollow, deleteFollow } from '../../services/followsService.js';

import TripInfo from '../TripInfo/TripInfo.js';
import CommentCard from '../CommentCard/CommentCard.js';
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

    if(!user){
        history.push('/login');
    }

    useEffect(() => {
        getTripDetails(tripId).then(x => {
            if (x.code !== 200) {
                message.error(x.message);
                return;
            }

            setTripInfo(x.data);
            getIsFollower(x.data.applicationUserId, user.token).then(x => {
                if (x.code !== 200) {
                    message.error(x.message);
                    return;
                }

                setIsFollower(x.data);
            });
        });
    }, [tripId, user.token, refreshInfo]);

    useEffect(() => {
        getUserTrips(tripId).then(y => {
            if (y.code !== 200) {
                message.error(y.data.message);
                return;
            }

            setUsers(y.data);
            setIsInTrip(y.data.some(z => z.ApplicationUserId === user.Id));
        });
    }, [tripId, user.Id, refreshUsers]);

    const onJoinLeaveTripClick = async () => {
        if (isInTrip === true) {
            setIsInTrip();
            const response = await leaveTrip(tripId, user.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        } else if (isInTrip === false) {
            setIsInTrip();
            const response = await joinTrip(tripId, user.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        }

        setRefreshUsers(x => !x);
    };

    const onFollowUnfollowClick = async () => {
        if (isFollower === true) {
            setIsFollower();
            const response = await deleteFollow(tripInfo.applicationUserId, user.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        } else if (isFollower === false) {
            setIsFollower();
            const response = await postFollow(tripInfo.applicationUserId, user.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        }

        setRefreshInfo(x => !x);
    };

    const onEditTripClick = (e) => {
        history.push('/edit/' + tripId);
    };

    return (
        <>
            <Row style={{ paddingTop: 30 }} justify="center">
                <Space>
                    {user?.userId === tripInfo?.applicationUserId
                        ? (<Button type="primary" onClick={onEditTripClick}>Edit Trip</Button>)
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
                <Col xs={{ span: 24 }} style={{ padding: 10 }}>
                    <CommentCard comment={tripInfo?.comment} loading={tripInfo === undefined} />
                </Col>
            </Row >
        </>
    );
}

export default Details;