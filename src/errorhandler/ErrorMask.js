import React from 'react'
import ErrorMessage from '../component/ui/error/ErrorMessage';

class ErrorMask extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };
    }
    static getDerivedStateFromError(error, info) {
        return {
            error: error,
        };
    }

    componentDidCatch(error, info) {
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <ErrorMessage error={this.state.error}></ErrorMessage>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorMask