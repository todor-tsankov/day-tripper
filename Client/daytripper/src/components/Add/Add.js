import { useContext, useState, useEffect } from 'react';
import { Form, Select, InputNumber, Button, Switch, DatePicker } from 'antd';

import UserContext from '../../context/UserContext.js';
import { getAreas } from '../../services/areasService.js';
import { getCrags } from '../../services/cragsService.js';
import { getSectors } from '../../services/sectorsService.js';
import { getCities } from '../../services/citiesService.js';
import { postTrip } from '../../services/detailsService.js';

function Add() {
    const [user] = useContext(UserContext);

    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);

    const [crags, setCrags] = useState([]);
    const [disabledCrags, setDsiabledCrags] = useState(true);

    const [sectors, setSectors] = useState([]);
    const [disabledSectors, setDsiabledSectors] = useState(true);

    const [seatsDisabled, setSeatsDisabled] = useState(false);

    useEffect(() => {
        getCities().then(x => setCities(x));
        getAreas().then(x => setAreas(x));
    }, []);

    const onFinish = (values) => {
        console.log(values);
    };

    const onAreasSelected = async (value,) => {
        setCrags(await getCrags(value));
        setDsiabledCrags(false);
    };

    const onCragsSelected = async (value) => {
        setSectors(await getSectors(value));
        setDsiabledSectors(false);
    };

    const onWithCarChange = (value) => setSeatsDisabled(!value);

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
            <Form.Item
                name='cityId'
                label='From City'
                rules={[
                    {
                        required: true,
                        message: 'Please select a City!',
                    }]}
            >
                <Select
                    showSearch
                    loading={cities.length === 0}
                    placeholder="Select City"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {cities.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item
                name='areaId'
                label='To Area'
                rules={[
                    {
                        required: true,
                        message: 'Please select Area!',
                    },
                ]}>
                <Select
                    showSearch
                    loading={areas.length === 0}
                    placeholder="Select Area"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={onAreasSelected}
                >
                    {areas.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item
                name='cragId'
                label='To Crag'
                rules={[
                    {
                        required: true,
                        message: 'Please select Crag!',
                    },
                ]}>
                <Select
                    showSearch
                    disabled={disabledCrags}
                    defaultActiveFirstOption={false}
                    placeholder="Select Crag"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onSelect={onCragsSelected}
                >
                    {crags.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item
                name='sectorId'
                label='To Sector'
            >
                <Select
                    showSearch
                    disabled={disabledSectors}
                    placeholder="Select Sector (optional)"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {sectors.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item
                name="withCar"
                label="I have a car"
            >
                <Switch valuePropName="checked" defaultChecked={true} onChange={onWithCarChange} noStyle/>
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
            <Form.Item
                name="times"
                label="Time"
                rules={[{ required: true }]}
            >
                <DatePicker.RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button">Add Trip</Button>
            </Form.Item>
        </Form>
    );
}

export default Add;