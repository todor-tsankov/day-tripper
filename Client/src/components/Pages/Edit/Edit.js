import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import { Form, Button, Spin, Row, Space, Popconfirm, message } from 'antd';

import authenticated from '../../../hocs/authenticated.js';
import authorized from '../../../hocs/authorized.js';

import UserContext from '../../../context/UserContext.js';
import CitiesSelect from '../../FormItems/CitiesSelect/CitiesSelect.js';
import AreasCragsSectors from '../../FormItems/AreasCragsSectorsSelect/AreasCragsSectorsSelect.js';
import SeatsWithCarInput from '../../FormItems/SeatsWithCarInput/SeatsWithCarInput.js';
import FromToInput from '../../FormItems/FromToInput/FromToInput.js';
import CommentInput from '../../FormItems/CommentInput/CommentInput.js';

import { getTripDetails, putTrip, deleteTrip } from '../../../services/detailsService.js';

function Edit({ history, match, unauthorized }) {
    const [user] = useContext(UserContext);

    const tripId = match.params.tripId;
    const [tripDetails, setTripDetails] = useState();

    const [sending, setSending] = useState(false);
    const [deleting, setDeleting] = useState(false);

    if (tripDetails && user?.userId !== tripDetails?.applicationUserId) {
        unauthorized();
    }

    useEffect(() => {
        let mounted = true;

        getTripDetails(tripId).then(x => {
            if(!mounted){
                return;
            }

            if (x.code !== 200) {
                message.error(x.message);
                return;
            }

            setTripDetails(x.data);
        });

        return () => mounted = false;
    }, [tripId]);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 12 },
    };

    const onFinish = async (values) => {
        setSending(true);

        values.tripId = tripId;

        if (!values.withCar) {
            values.seats = undefined;
        }

        values.leaving = values.times[0].utc().format();
        values.returning = values.times[1].utc().format();
        values.times = undefined;

        const response = await putTrip(values, user.token);
        setSending(false);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
        history.push('/details/' + tripId);
    };

    const onDelete = async () => {
        setDeleting(true);
        const response = await deleteTrip(tripId, user.token);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
        history.push('/');
    };

    if (!tripDetails || (tripDetails && user?.userId !== tripDetails?.applicationUserId)) {
        return (
            <Row style={{ padding: 50 }} align="center">
                <Spin></Spin>
            </Row>
        );
    }

    return (
        <Form {...layout}
            style={{ padding: 50 }}
            onFinish={onFinish}
            initialValues={{
                cityId: tripDetails.cityId,
                areaId: tripDetails.cragAreaId,
                cragId: tripDetails.cragId,
                sectorId: tripDetails.sectorId,
                withCar: tripDetails.withCar,
                seats: tripDetails.seats,
                times: [
                    moment.utc(tripDetails?.leaving).local(),
                    moment.utc(tripDetails?.returning).local(),
                ]
            }}
        >
            <CitiesSelect />
            <AreasCragsSectors areaId={tripDetails.cragAreaId} cragId={tripDetails.cragId} />
            <SeatsWithCarInput withCar={tripDetails.withCar} />
            <FromToInput />
            <CommentInput />

            <Form.Item {...tailLayout}>
                <Space>
                    <Button loading={sending} type="primary" htmlType="submit">Save</Button>
                    <Popconfirm
                        title="Are you sure to delete this trip?"
                        onConfirm={onDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger loading={deleting}>Delete</Button>
                    </Popconfirm>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default authorized(authenticated(Edit));