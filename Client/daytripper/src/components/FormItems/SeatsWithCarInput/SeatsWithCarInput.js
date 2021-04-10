import { useState } from 'react';
import { Form, Switch, InputNumber } from 'antd';

function SeatsWithCarInput() {
    const [seatsDisabled, setSeatsDisabled] = useState(false);
    const onWithCarChange = (value) => setSeatsDisabled(!value);

    return (
        <>
            <Form.Item
                name="withCar"
                label="I have a car"
            >
                <Switch valuePropName="checked" defaultChecked={true} onChange={onWithCarChange} />
            </Form.Item>
            <Form.Item
                name="seats"
                label="Seats avaible:"
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