import moment from 'moment';
import { Form, Button, Spin, Row, Space } from 'antd';
import { useState, useEffect, useContext } from 'react';

import UserContext from '../../context/UserContext.js';
import CitiesSelect from '../FormItems/CitiesSelect/CitiesSelect.js';
import AreasCragsSectors from '../FormItems/AreasCragsSectorsSelect/AreasCragsSectorsSelect.js';
import SeatsWithCarInput from '../FormItems/SeatsWithCarInput/SeatsWithCarInput.js';
import FromToInput from '../FormItems/FromToInput/FromToInput.js';
import CommentInput from '../FormItems/CommentInput/CommentInput.js';

import { getTripDetails, putTrip, deleteTrip } from '../../services/detailsService.js';

function Edit({ history, match }) {
    const [user] = useContext(UserContext);

    const tripId = match.params.tripId;
    const [tripDetails, setTripDetails] = useState();

    const [sending, setSending] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        getTripDetails(tripId).then(x => setTripDetails(x));
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

        values.leaving = values.times[0]._d;
        values.returning = values.times[1]._d;
        values.times = undefined;

        await putTrip(values, user.token);
        setSending(false);
    };

    const onDelete = async () => {
        setDeleting(true);
        await deleteTrip(tripId, user.token);
        history.push('/');
    };

    if (!tripDetails) {
        return (
            <Row style={{ padding: 50 }} align="center">
                <Spin></Spin>
            </Row>
        );
    }

    return (
        <Form {...layout}
            style={{ padding: 50 }}
            name="normal_add"
            className="add-form"
            onFinish={onFinish}
            initialValues={{
                cityId: tripDetails.cityId,
                areaId: tripDetails.cragAreaId,
                cragId: tripDetails.cragId,
                sectorId: tripDetails.sectorId,
                withCar: tripDetails.withCar,
                seats: tripDetails.seats,
                times: [
                    moment(tripDetails?.leaving),
                    moment(tripDetails?.returning)
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
                    <Button loading={sending} type="primary" htmlType="submit" className="login-form-button">Save</Button>
                    <Button danger loading={deleting} onClick={onDelete}>Delete</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

export default Edit;