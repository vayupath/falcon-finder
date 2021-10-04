import React from "react";
const ApiFetchError = ({ error }) => {


    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-blue-800'>{error.message}</h1>
            <h2 className='text-2xl text-blue-600'>{error.url}</h2>
            <h2 className='text-2xl text-blue-600'>{error.statusText}</h2>
            <h2 className='text-2xl text-blue-600'>{error.status}</h2>
        </div>

    );
};

export default ApiFetchError;
