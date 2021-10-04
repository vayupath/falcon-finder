import React from "react";
import ApiFetchError from './ApiFetchError'

const ErrorMessage = ({ error }) => {

    const ERROR_PAGES = {
        'APIFetchError': ApiFetchError
    }

    const Handler = ERROR_PAGES[error.name]

    return (
        <div>
            <Handler error={error}></Handler>
        </div>

    );
};

export default ErrorMessage;
