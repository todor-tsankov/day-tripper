import { Component } from 'react';
import RenderError from '../ErrorPages/RenderError/RenderError.js';

class GlobalBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <RenderError></RenderError>;
        }

        return this.props.children;
    }
}

export default GlobalBoundry;