import React from 'react';
import Loading from '../Components/Loading';
import Services from '../Components/Services/Services';
import useProducts from '../Hooks/useProduct';

const Products = () => {
    const [services, isLoading, error] = useProducts();
    console.log(services?.length);
    let item = services?.length;

    if (isLoading) {
        <Loading></Loading>
    }
    if (error) {
        console.log(error)
    }

    return (
        <div>
            <Services item={item}></Services>
        </div>
    );
};

export default Products;