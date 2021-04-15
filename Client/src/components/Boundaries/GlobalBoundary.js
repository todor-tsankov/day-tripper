import { Component } from 'react';
import ServerError from '../ErrorPages/RenderError/RenderError.js';

class GlobalBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch() {
    }

    render() {
        if (this.state.hasError) {
            return <ServerError></ServerError>;
        }

        return this.props.children;
    }
}

export default GlobalBoundry;