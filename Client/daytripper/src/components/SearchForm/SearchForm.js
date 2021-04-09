import { useState, useEffect } from 'react';
import { Form, Select, InputNumber, Switch, DatePicker } from 'antd';

import { getCrags } from '../../services/cragsService.js';
import { getCities } from '../../services/citiesService.js';

function SearchForm({ onFormFieldsChange }) {
    const [cities, setCities] = useState([]);
    const [crags, setCrags] = useState([]);

    useEffect(() => {
        getCities().then(x => setCities(x));
        getCrags().then(x => setCrags(x));
    }, []);

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    return (
        <Form {...layout}
            style={{ padding: 50 }}
            name="normal_add"
            className="add-form"
            onFieldsChange={onFormFieldsChange}
        >
            <Form.Item name='cityId' label='From City'>
                <Select
                    showSearch
                    allowClear
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
            <Form.Item name='cragId' label='To Crag'>
                <Select
                    showSearch
                    allowClear
                    placeholder="Select Crag"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {crags.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
            <Form.Item name="date" label="Date">
                <DatePicker />
            </Form.Item>
            <Form.Item name="seats" label="Minimum Seats">
                <InputNumber
                    min={1}
                    max={10}
                />
            </Form.Item>
            <Form.Item name="orderBy" label="Order By">
                <Select>
                    <Select.Option value="lDate">Leaving Date</Select.Option>
                    <Select.Option value="rDate">Returning Date</Select.Option>
                    <Select.Option value="seats">Number of Seats</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="ascending" label="Ascending">
                <Switch defaultChecked={false} />
            </Form.Item>
        </Form>
    );
}

export default SearchForm;