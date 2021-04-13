import moment from 'moment';
import { useState, useEffect } from 'react';

import SearchForm from '../SearchForm/SearchForm.js';
import LoadMoreTripList from '../LoadMoreTripList/LoadMoreTripList.js';

import { getTrips } from '../../services/tripsService.js';

function Search({match}) {
    const dateString = match.params.date;
    const decodedDateString = dateString ? decodeURIComponent(dateString) : undefined;
    const date = dateString ? moment(decodedDateString) : undefined;

    const take = 10;
    const [skip, setSkip] = useState(0);

    const [trips, setTrips] = useState([]);
    const [list, setList] = useState([]);

    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(true);
    const [filters, setFilters] = useState({ take: take, date: decodedDateString });

    const [end, setEnd] = useState(false);

    useEffect(() => {
        setInitLoading(true);

        getTrips(filters).then(x => {
            if(x.length !== take){
                setEnd(true);
            }
            setTrips(x);
            setList(x);
            setInitLoading(false);
        });
    }, [filters]);

    const onFormFieldsChange = async (changed, all) => {
        setSkip(0);
        setEnd(false);
        
        const data = all.reduce((a, c) => {
            a[c.name] = c.value;
            return a;
        }, {});

        data.skip = 0;
        data.take = take;
        data.date = data.date?.utc().format();

        setFilters(data);
    };

    const onLoadMore = async () => {
        setLoading(true);

        setList(x => x.concat([...new Array(take)].map(() => ({ loading: true, name: {} }))));

        const newFilters = Object.assign({}, filters);
        newFilters.skip = skip + take;
        newFilters.take = take;

        const newTrips = await getTrips(newFilters);

        setList(trips.concat(newTrips));
        setTrips(prev => prev.concat(newTrips));

        setLoading(false);
        setSkip(x => x + take);

        if(newTrips.length !== take){
            setEnd(true);
        }
    };

    return (
        <div style={{marginBottom: 30}}>
            <SearchForm onFormFieldsChange={onFormFieldsChange} date={date}/>
            <LoadMoreTripList list={list} loading={loading} initLoading={initLoading} onLoadMore={onLoadMore} end={end} />
        </div>
    );
}

export default Search;