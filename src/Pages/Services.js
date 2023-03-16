

import React from 'react';
import useProducts from '../Hooks/useProduct';

const Services = () => {

    const [services, isLoading, error] = useProducts();

    return (
        <div>
            <h1>Services Page {services.length}</h1>
        </div>
    );
};

export default Services;