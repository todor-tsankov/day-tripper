import { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import { getCities } from '../../../services/citiesService.js';

function CitiesSelect() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities().then(x => setCities(x));
    }, []);

    return (
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
    );
}

export default CitiesSelect;