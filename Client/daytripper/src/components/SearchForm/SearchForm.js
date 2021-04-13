import { useState, useEffect } from 'react';
import { Form, Select, InputNumber, Switch, DatePicker, message } from 'antd';

import { getCrags } from '../../services/cragsService.js';
import { getCities } from '../../services/citiesService.js';

function SearchForm({ onFormFieldsChange, date }) {
    const [cities, setCities] = useState([]);
    const [crags, setCrags] = useState([]);

    useEffect(() => {
        getCities().then(x => {
            if(x.code !== 200){
                message.error(x.message);
                return;
            }

            setCities(x.data);
        });
        getCrags().then(x => {
            if(x.code !== 200){
                message.error(x.message);
                return;
            }

            setCrags(x.data);
        });
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
            initialValues={{
                date: date
            }}
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
                    {cities?.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
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
                    {crags?.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
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