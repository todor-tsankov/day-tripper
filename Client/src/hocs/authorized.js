import { useHistory } from 'react-router-dom';

function authorized(Inner) {
    const Outer = (props) => {
        const history = useHistory();
        const unauthorized = () => {
            history.push('/unauthorized');
        };

        return <Inner {...props} unauthorized={unauthorized}/>;
    };

    return Outer;
}

export default authorized;