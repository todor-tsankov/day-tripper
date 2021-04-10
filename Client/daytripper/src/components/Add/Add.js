import { useContext } from 'react';
import { Form, Button } from 'antd';

import CitiesSelect from '../FormItems/CitiesSelect/CitiesSelect.js';
import AreasCragsSectors from '../FormItems/AreasCragsSectorsSelect/AreasCragsSectorsSelect.js';
import SeatsWithCarInput from '../FormItems/SeatsWithCarInput/SeatsWithCarInput.js';
import FromToInput from '../FormItems/FromToInput/FromToInput.js';
import CommentInput from '../FormItems/CommentInput/CommentInput.js';

import UserContext from '../../context/UserContext.js';
import { postTrip } from '../../services/detailsService.js';

function Add() {
    const [user] = useContext(UserContext);

    const onFinish = async (values) => {
        values.leaving = values.times[0]._d;
        values.returning = values.times[1]._d;
        values.times = undefined;

        if(!values.withCar){
            values.seats = undefined;
        }

        console.log(values);
        await postTrip(values, user.token);
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
            <FromToInput/>
            <CommentInput />
            
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button">Add Trip</Button>
            </Form.Item>
        </Form>
    );
}

export default Add;