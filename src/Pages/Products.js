import React from 'react';
import Services from '../Components/Services/Services';


const Products = () => {

    // const [services, isLoading, error] = useProducts();
    // // console.log(services?.length);
    // let item = services?.length;

    // if (isLoading) {
    //     <Loading></Loading>
    // }
    // if (error) {
    //     console.log(error)
    // }

    return (
        <div>
            <Services item={true}></Services>
        </div>
    );
};

export default Products;