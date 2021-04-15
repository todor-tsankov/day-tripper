import { useState, useEffect } from 'react';
import { Form, Select, message } from 'antd';

import { getAreas } from '../../../services/areasService.js';
import { getCrags } from '../../../services/cragsService.js';
import { getSectors } from '../../../services/sectorsService.js';

function AreasCragsSectors({ areaId, cragId }) {
    const [areas, setAreas] = useState([]);

    const [crags, setCrags] = useState([]);
    const [disabledCrags, setDsiabledCrags] = useState(true);

    const [sectors, setSectors] = useState([]);
    const [disabledSectors, setDsiabledSectors] = useState(true);

    useEffect(() => {
        let mounted = true;

        getAreas().then(x => {
            if (!mounted) {
                return;
            }

            if (x.code !== 200) {
                message.error(x.message);
                return;
            }

            setAreas(x.data);
        });

        return () => mounted = false;
    }, []);

    useEffect(() => {
        let mounted = true;
        if (areaId && cragId) {
            onAreasSelected(areaId).then(x => {
                if (!mounted) {
                    return;
                }
                
                onCragsSelected(cragId);
            });
        }
        return () => mounted = false;
    }, [areaId, cragId]);

    const onAreasSelected = async (value) => {
        const response = await getCrags(value);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        setCrags(response.data);
        setDsiabledCrags(false);
    };

    const onCragsSelected = async (value) => {
        const response = await getSectors(value);

        if (response.code !== 200) {
            message.error(response.message);
            return;
        }

        setSectors(response.data);
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
                    {areas?.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
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
                    {crags?.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
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
                    {sectors?.map(x => (<Select.Option key={x.id} value={x.id}>{x.name}</Select.Option>))}
                </Select>
            </Form.Item>
        </>
    );
}

export default AreasCragsSectors;