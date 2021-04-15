import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext.js';

import { Row, Col, Button, Space, message } from 'antd';

import { getTripDetails } from '../../../services/detailsService.js';
import { getUserTrips, joinTrip, leaveTrip } from '../../../services/userTripsService.js';
import { getIsFollower, postFollow, deleteFollow } from '../../../services/followsService.js';

import TripInfo from '../../Other/TripInfo/TripInfo.js';
import CommentCard from '../../Other/CommentCard/CommentCard.js';
import UsersInTripTable from '../../Other/UsersInTripTable/UsersInTripTable.js';

function Details({ history, location, match }) {
    const tripId = match.params.tripId;

    const [user] = useContext(UserContext);
    const [tripInfo, setTripInfo] = useState();
    const [users, setUsers] = useState([]);
    const [isInTrip, setIsInTrip] = useState();
    const [isFollower, setIsFollower] = useState();

    const [refreshInfo, setRefreshInfo] = useState(true);
    const [refreshUsers, setRefreshUsers] = useState(false);

    if (!user) {
        history.push({ pathname: '/login', state: { back: location.pathname } });
    }

    useEffect(() => {
        let mounted = true;

        if (!user?.token) {
            return;
        }

        getTripDetails(tripId).then(x => {
            if(!mounted){
                return;
            }

            if(x.code === 404){
                history.push('/notfound');
            }

            if (x.code !== 200) {
                message.error(x.message);
                return;
            }

            setTripInfo(x.data);
            getIsFollower(x.data.applicationUserId, user?.token).then(x => {
                if(!mounted){
                    return;
                }

                if (x.code !== 200) {
                    message.error(x.message);
                    return;
                }

                setIsFollower(x.data);
            });
        });

        return () => mounted = false;
    }, [tripId, user?.token, refreshInfo, history]);

    useEffect(() => {
        let mounted = true;

        if (!user?.userId) {
            return;
        }

        getUserTrips(tripId).then(y => {
            if(!mounted){
                return;
            }

            if (y.code !== 200) {
                message.error(y.data.message);
                return;
            }

            setUsers(y.data);
            setIsInTrip(y.data.some(z => z.applicationUserId === user.userId));
        });

        return () => mounted = false;
    }, [tripId, user?.userId, refreshUsers]);

    const onJoinLeaveTripClick = async () => {
        if (!user) {
            return;
        }

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
        if (!user) {
            return;
        }

        if (isFollower === true) {
            setIsFollower();
            const response = await deleteFollow(tripInfo.applicationUserId, user?.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        } else if (isFollower === false) {
            setIsFollower();
            const response = await postFollow(tripInfo.applicationUserId, user?.token);

            if (response.code !== 200) {
                message.error(response.message);
            } else {
                message.info(response.message);
            }
        }

        setRefreshInfo(x => !x);
    };

    return (
        <>
            <Row style={{ paddingTop: 30 }} justify="center">
                <Space>
                    {user?.userId === tripInfo?.applicationUserId
                        ? (<Button type="primary"><Link to={'/edit/' + tripId}>Edit Trip</Link></Button>)
                        : (
                            <>
                                <Button onClick={onJoinLeaveTripClick} disabled={users?.length >= tripInfo?.seats || !tripInfo?.withCar} loading={isInTrip === undefined} type="primary">{isInTrip ? 'Leave Trip' : 'Join Trip'}</Button>
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