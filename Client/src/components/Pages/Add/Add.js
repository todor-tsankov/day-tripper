import { useContext, useState } from 'react';
import { Form, Button, message } from 'antd';

import authenticated from '../../../hocs/authenticated.js';

import CitiesSelect from '../../FormItems/CitiesSelect/CitiesSelect.js';
import AreasCragsSectors from '../../FormItems/AreasCragsSectorsSelect/AreasCragsSectorsSelect.js';
import SeatsWithCarInput from '../../FormItems/SeatsWithCarInput/SeatsWithCarInput.js';
import FromToInput from '../../FormItems/FromToInput/FromToInput.js';
import CommentInput from '../../FormItems/CommentInput/CommentInput.js';

import UserContext from '../../../context/UserContext.js';
import { postTrip } from '../../../services/detailsService.js';

function Add({ history }) {
    const [user] = useContext(UserContext);
    const [sending, setSending] = useState(false);

    const onFinish = async (values) => {
        values.leaving = values.times[0].utc().format();
        values.returning = values.times[1].utc().format();
        values.times = undefined;

        if (!values.withCar) {
            values.seats = undefined;
        }

        setSending(true);
        const response = await postTrip(values, user.token);
        setSending(false);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        message.info(response.message);
        history.push('/');
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 12 },
    };

    const tailLayout = {
        wrapperCol: { offset: 4, span: 12 },
    };

    return (
        <Form {...layout}
            style={{ padding: 50 }}
            name="normal_add"
            className="add-form"
            onFinish={onFinish}
            initialValues={{
                withCar: true,
            }}
        >
            <CitiesSelect />
            <AreasCragsSectors />
            <SeatsWithCarInput />
            <FromToInput />
            <CommentInput />

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={sending}>Add Trip</Button>
            </Form.Item>
        </Form>
    );
}

export default authenticated(Add);