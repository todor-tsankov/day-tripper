import { useState } from 'react';
import { Form, Switch, InputNumber } from 'antd';

function SeatsWithCarInput({withCar}) {
    const [seatsDisabled, setSeatsDisabled] = useState(!withCar);
    const onWithCarChange = (value) => setSeatsDisabled(!value);

    return (
        <>
            <Form.Item
                name="withCar"
                label="I have a car"
            >
                <Switch defaultChecked={withCar} onChange={onWithCarChange} />
            </Form.Item>
            <Form.Item
                name="seats"
                label="Seats available:"
                rules={[{
                    required: !seatsDisabled,
                    message: 'Number of avaible seats is required!'
                }]}
            >
                <InputNumber
                    disabled={seatsDisabled}
                    min={1}
                    max={10}
                />
            </Form.Item>
        </>
    );
}

export default SeatsWithCarInput;