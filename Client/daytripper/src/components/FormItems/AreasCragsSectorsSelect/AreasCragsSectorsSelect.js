import { useState, useEffect } from 'react';
import { Form, Select } from 'antd';

import { getAreas } from '../../../services/areasService.js';
import { getCrags } from '../../../services/cragsService.js';
import { getSectors } from '../../../services/sectorsService.js';

function AreasCragsSectors() {

    const [areas, setAreas] = useState([]);

    const [crags, setCrags] = useState([]);
    const [disabledCrags, setDsiabledCrags] = useState(true);

    const [sectors, setSectors] = useState([]);
    const [disabledSectors, setDsiabledSectors] = useState(true);

    useEffect(() => {
        getAreas().then(x => setAreas(x));
    }, []);


    const onAreasSelected = async (value,) => {
        setCrags(await getCrags(value));
        setDsiabledCrags(false);
    };

    const onCragsSelected = async (value) => {
        setSectors(await getSectors(value));
        setDsiabledSectors(false);
    };

    return (
        <>
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
        </>
    );
}

export default AreasCragsSectors;